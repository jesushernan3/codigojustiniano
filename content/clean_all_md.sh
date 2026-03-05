find "/f/Proyects/Proyect - CrMoDe/06. Proyectos/codigojustiniano/cic(clean)/content" \
-type f -name "*.md" ! -name "*.clean.md" -print0 |
xargs -0 -P 8 -I{} bash -c '
temp="{}.tmp"
python md_clean.py "{}" "$temp"
mv "$temp" "{}"
'