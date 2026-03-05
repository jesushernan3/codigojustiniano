#!/usr/bin/env python3
import re
import sys
from pathlib import Path

CODE_FENCE_RE = re.compile(r"(^```.*?$.*?^```[ \t]*$)", re.M | re.S)

def split_keep_codeblocks(text: str):
    """
    Separa el documento en partes: [texto normal, bloque código, texto normal, ...]
    para NO romper código con regex de párrafos.
    """
    parts = []
    last = 0
    for m in CODE_FENCE_RE.finditer(text):
        parts.append(("text", text[last:m.start()]))
        parts.append(("code", m.group(1)))
        last = m.end()
    parts.append(("text", text[last:]))
    return parts

def normalize_newlines(s: str) -> str:
    # CRLF/CR -> LF
    s = s.replace("\r\n", "\n").replace("\r", "\n")
    # elimina espacios al final de línea
    s = re.sub(r"[ \t]+$", "", s, flags=re.M)
    # colapsa 3+ saltos a 2
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s

def remove_blank_line_after_headings(s: str) -> str:
    """
    Elimina líneas vacías inmediatamente después de headings (#..######).
    Convierte:
      ## Titulo\n\nTexto
      ## Titulo\n   \nTexto
      ## Titulo\n\n\nTexto
    en:
      ## Titulo\nTexto
    """
    return re.sub(r"^(#{1,6}[ \t].*?)\n[ \t]*\n+", r"\1\n", s, flags=re.M)

def remove_blank_lines_inside_paragraphs(s: str) -> str:
    """
    Caso típico: texto con una línea en blanco entre cada línea (PDF/transcripción).
    Convierte:
      linea1\n\nlinea2
    en:
      linea1\nlinea2
    SOLO cuando ambas líneas parecen "texto normal" (no headings, listas, citas, fences).
    """
    def is_special(line: str) -> bool:
        t = line.lstrip()
        return (
            t.startswith("#") or
            t.startswith(">") or
            t.startswith("- ") or
            t.startswith("* ") or
            re.match(r"^\d+\.\s", t) is not None or
            t.startswith("```")
        )

    lines = s.split("\n")
    out = []
    i = 0

    while i < len(lines):
        line = lines[i]
        if i + 2 < len(lines):
            next_blank = (lines[i + 1].strip() == "")
            next_line = lines[i + 2]

            # Si es: texto normal + línea vacía + texto normal => eliminar la línea vacía
            if line.strip() and next_blank and next_line.strip():
                if (not is_special(line)) and (not is_special(next_line)):
                    out.append(line)
                    # saltamos la línea vacía, pero mantenemos el flujo
                    i += 2
                    continue

        out.append(line)
        i += 1

    return "\n".join(out)

def ensure_no_blank_after_headings(s: str) -> str:
    """
    Asegura que luego de un encabezado (#..######) NO haya línea en blanco.
    Convierte:
      ## Titulo\n\nTexto
    en:
      ## Titulo\nTexto
    """
    return re.sub(r"^(#{1,6}[ \t].*?)\n{2,}(?=\S)", r"\1\n", s, flags=re.M)

def ensure_blank_before_headings(s: str) -> str:
    # Asegura una línea en blanco antes de headings (excepto al inicio)
    s = re.sub(r"(?<!\n)\n(#{1,6}[ \t])", r"\n\n\1", s)
    s = re.sub(r"(?<!\n)\n\n(#{1,6}[ \t])", r"\n\n\1", s)
    # Si hay texto pegado sin salto antes del heading:
    s = re.sub(r"([^\n])\n(#{1,6}[ \t])", r"\1\n\n\2", s)
    return s

def fix_wrapped_paragraphs(s: str) -> str:
    """
    Une líneas cortadas dentro de un mismo párrafo (estilo PDF),
    pero NO toca listas, citas, headings, tablas, líneas vacías.
    Heurística: si una línea termina "normal" y la siguiente empieza "normal",
    se une con espacio.
    """
    lines = s.split("\n")
    out = []
    i = 0

    def is_special(line: str) -> bool:
        t = line.lstrip()
        return (
            t.startswith("#") or
            t.startswith(">") or
            t.startswith("- ") or
            t.startswith("* ") or
            re.match(r"^\d+\.\s", t) is not None or
            t.startswith("```") or
            "|" in line  # evita romper tablas simples
        )

    while i < len(lines):
        line = lines[i]
        if not line.strip():
            out.append("")
            i += 1
            continue

        if is_special(line):
            out.append(line)
            i += 1
            continue

        # estamos en párrafo normal: acumular hasta línea vacía o special
        buf = [line.strip()]
        i += 1
        while i < len(lines):
            nxt = lines[i]
            if not nxt.strip():
                break
            if is_special(nxt):
                break

            # Si la línea anterior termina con guión de corte de palabra: "conver-"
            # y la siguiente sigue con "sión", juntamos sin espacio.
            prev = buf[-1]
            if prev.endswith("-") and len(prev) > 2 and prev[-2].isalpha() and nxt[:1].isalpha():
                buf[-1] = prev[:-1] + nxt.strip()
            else:
                buf.append(nxt.strip())

            i += 1

        # Une el párrafo en una sola línea
        paragraph = " ".join(buf)
        # Limpieza: múltiples espacios
        paragraph = re.sub(r"\s{2,}", " ", paragraph).strip()
        out.append(paragraph)

        # No consumimos la línea vacía/special, la procesa el loop siguiente
    return "\n".join(out)

def ensure_double_newlines_between_paragraphs(s: str) -> str:
    # Asegura máximo 2 saltos (ya hecho) y evita párrafos pegados:
    s = re.sub(r"([^\n])\n([^\n#>\-\*\d\|])", r"\1\n\n\2", s)
    return s

def clean_markdown(text: str) -> str:
    text = normalize_newlines(text)

    parts = split_keep_codeblocks(text)
    cleaned = []

    for kind, chunk in parts:
        if kind == "code":
            # preserva tal cual
            cleaned.append(chunk)
            continue

        chunk = ensure_blank_before_headings(chunk)          # si querés
        # (NO llames ensure_blank_after_headings en ningún lado)

        chunk = remove_blank_lines_inside_paragraphs(chunk)
        chunk = fix_wrapped_paragraphs(chunk)
        chunk = ensure_double_newlines_between_paragraphs(chunk)
        chunk = normalize_newlines(chunk)

        # <-- ESTO AL FINAL, para que no lo deshagan otras reglas:
        chunk = remove_blank_line_after_headings(chunk)



        cleaned.append(chunk)

    result = "".join(cleaned)
    result = normalize_newlines(result).strip() + "\n"
    return result

def main():
    if len(sys.argv) < 2:
        print("Uso: python md_clean.py input.md [output.md]")
        sys.exit(1)

    inp = Path(sys.argv[1])
    out = Path(sys.argv[2]) if len(sys.argv) >= 3 else inp.with_suffix(".clean.md")

    text = inp.read_text(encoding="utf-8", errors="replace")
    cleaned = clean_markdown(text)
    out.write_text(cleaned, encoding="utf-8")

    print(f"OK: {inp} -> {out}")

if __name__ == "__main__":
     main()