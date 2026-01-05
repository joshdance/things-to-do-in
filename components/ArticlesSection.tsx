import { CityArticle } from "@/data/cities";

interface ArticlesSectionProps {
  articles: CityArticle[];
  cityName: string;
}

export function ArticlesSection({ articles, cityName }: ArticlesSectionProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Articles & Guides</h2>
      <p className="text-gray-600 mb-6">
        Helpful travel guides and articles about {cityName}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500">{article.source}</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </div>

              {article.description && (
                <p className="text-sm text-gray-600 line-clamp-3">
                  {article.description}
                </p>
              )}

              <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-700 font-medium">
                Read article
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
