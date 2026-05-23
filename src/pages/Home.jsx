import { Navigate, useParams } from "react-router";
import { isValidLang, getSafeLang } from "../data/languages";

const homeText = {
  title: {
    es: "Código Justiniano",
    la: "Codex Iustinianus",
    en: "Justinian Code",
  },
  description: {
    es: "El Corpus Iuris Civilis se publicó en tres partes, en latín, bajo la dirección del cuestor imperial Triboniano a petición del emperador Justiniano en 529-534. La primera parte fue el Codex Justinianus, que compiló todas las constituciones imperiales existentes desde la época de Adriano. Utilizó tanto el Codex Theodosianus como colecciones privadas como el Codex Gregorianus y el Codex Hermogenianus. La segunda parte, el Digesto (Digesta) o Pandectas (Pandectae), se publicó en 533: recopiló los escritos de los grandes juristas romanos como Ulpiano junto con los edictos vigentes. La tercera parte, las Instituciones (Institutiones), fue concebida como una especie de libro de texto legal para las escuelas de derecho. Más tarde, Justiniano publicó una serie de otras leyes, principalmente en griego, que se llamaron Novelas (Novellae).",
    la: "Bibliotheca digitalis iuris Romani Iustiniani.",
    en: "The Corpus Iuris Civilis was published in three parts, in Latin, under the direction of the imperial quaestor Tribonian at the request of the emperor Justinian in 529-534. The first part was the Codex Justinianus, which compiled all existing imperial constitutions from the time of Hadrian. It used both the Codex Theodosianus and private collections such as the Codex Gregorianus and the Codex Hermogenianus. The second part, the Digest (Digesta) or Pandects (Pandectae), was published in 533: it compiled the writings of great Roman jurists such as Ulpian along with the edicts in force. The third part, the Institutes (Institutiones), was intended as a kind of legal textbook for law schools. Later, Justinian published a series of other laws, mainly in Greek, which were called Novels (Novellae).",
  },
};

function text(value, lang) {
  return value[lang] || value.es;
}

export default function Home() {
  const { lang } = useParams();

  if (!isValidLang(lang)) {
    return <Navigate to="/es" replace />;
  }

  const safeLang = getSafeLang(lang);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">
          {text(homeText.title, safeLang)}
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          {text(homeText.description, safeLang)}
        </p>
      </section>
    </main>
  );
}

// export default function Home() {
//   return (
//     <div className=" flex justify-center m-5">
//       <p className="block text-zinc-800 bg-white rounded-2xl max-w-2xl text-justify p-5 ">
// El Corpus Iuris Civilis se publicó en tres partes, en latín, bajo la
// dirección del cuestor imperial Triboniano a petición del emperador
// Justiniano en 529-534. La primera parte fue el Codex Justinianus, que
// compiló todas las constituciones imperiales existentes desde la época de
// Adriano. Utilizó tanto el Codex Theodosianus como colecciones privadas
// como el Codex Gregorianus y el Codex Hermogenianus. La segunda parte, el
// Digesto (Digesta) o Pandectas (Pandectae), se publicó en 533: recopiló
// los escritos de los grandes juristas romanos como Ulpiano junto con los
// edictos vigentes. La tercera parte, las Instituciones (Institutiones),
// fue concebida como una especie de libro de texto legal para las escuelas
// de derecho. Más tarde, Justiniano publicó una serie de otras leyes,
// principalmente en griego, que se llamaron Novelas (Novellae).
//       </p>
//     </div>
//   );
// }
