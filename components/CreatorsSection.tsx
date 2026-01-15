import { CityCreator } from "@/data/cities";

interface CreatorsSectionProps {
  creators: CityCreator[];
  cityName: string;
}

export function CreatorsSection({ creators, cityName }: CreatorsSectionProps) {
  if (!creators || creators.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Go To Creators & Guides</h2>
        </div>
        <button className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          Get Featured as a Local Creator
        </button>
      </div>
      <p className="text-gray-600 mb-6">
        Trusted sources and creators for exploring {cityName}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((creator, index) => (
          <a
            key={index}
            href={creator.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden group border border-blue-100"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                    {creator.name}
                  </h3>
                  {creator.platform && (
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                      {creator.platform}
                    </span>
                  )}
                </div>
                <svg
                  className="w-6 h-6 text-blue-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>

              {creator.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {creator.description}
                </p>
              )}

              <div className="flex items-center text-sm text-blue-600 group-hover:text-blue-700 font-semibold">
                <span>Visit {creator.name}</span>
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
