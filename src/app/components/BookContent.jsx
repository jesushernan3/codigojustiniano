import { getText } from "../../utils/getText";

function getParagraphs(paragraphs, lang) {
  if (!paragraphs) return [];

  return (
    paragraphs[lang] || paragraphs.es || paragraphs.la || paragraphs.en || []
  );
}
function getTocItems(toc, lang) {
  if (!toc) return [];

  return toc.map((item) => ({
    id: item.id,
    label: getText(item.label, lang),
  }));
}

function getArticles(articles, lang) {
  if (!articles) return [];

  return articles.map((article) => ({
    id: article.id,
    title: getText(article.title, lang),
    paragraphs: getParagraphs(article.paragraphs, lang),
  }));
}

export default function BookContent({ content, lang = "es" }) {
  const tocItems = getTocItems(content.toc, lang);

  return (
    <article
      id="main-content"
      className="prose prose-zinc max-w-none overflow-y-auto scroll-smooth">
      <header className="mb-10 border-b border-zinc-200 pb-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-zinc-500">
          {content.category}
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          {getText(content.title, lang)}
        </h1>

        {tocItems.length > 0 && (
          <nav className="mt-8">
            <ul className="space-y-2">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-zinc-700 hover:text-zinc-900 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {content.sections?.map((section) => {
        const sectionTitle = getText(section.title, lang);
        const articles = getArticles(section.articles, lang);

        return (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="py-2 font-bold">{sectionTitle}</h2>

            {articles.map((article) => (
              <article
                key={article.id}
                id={article.id}
                className="scroll-mt-24">
                <h3 className="py-2 font-semibold">{article.title}</h3>

                {article.paragraphs.map((paragraph, index) => (
                  <p className="mb-3 text-justify" key={index}>
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </section>
        );
      })}
    </article>
  );
}
