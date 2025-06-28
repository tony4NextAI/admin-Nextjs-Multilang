// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Livestream'
    },
    vi: {
      title: 'Phát trực tiếp'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

export default async function LivestreamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No livestreams</h3>
          <p className="mt-1 text-sm text-gray-500">
            Livestream management features will be implemented here.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Livestream
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 