export default function TailwindTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Tailwind CSS Test Page
        </h1>
        
        {/* Test basic styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card 1</h2>
            <p className="text-gray-600">This is a test card with Tailwind styling.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card 2</h2>
            <p className="text-gray-600">Another test card to verify grid layout.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card 3</h2>
            <p className="text-gray-600">Third card to complete the grid.</p>
          </div>
        </div>
        
        {/* Test buttons */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Button Tests</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Primary Button
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Secondary Button
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Success Button
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Danger Button
            </button>
          </div>
        </div>
        
        {/* Test forms */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Form Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Input
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter text..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Input
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Test colors */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Color Tests</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <div className="bg-red-500 h-16 rounded flex items-center justify-center text-white text-sm">Red</div>
            <div className="bg-blue-500 h-16 rounded flex items-center justify-center text-white text-sm">Blue</div>
            <div className="bg-green-500 h-16 rounded flex items-center justify-center text-white text-sm">Green</div>
            <div className="bg-yellow-500 h-16 rounded flex items-center justify-center text-white text-sm">Yellow</div>
            <div className="bg-purple-500 h-16 rounded flex items-center justify-center text-white text-sm">Purple</div>
            <div className="bg-pink-500 h-16 rounded flex items-center justify-center text-white text-sm">Pink</div>
            <div className="bg-indigo-500 h-16 rounded flex items-center justify-center text-white text-sm">Indigo</div>
            <div className="bg-gray-500 h-16 rounded flex items-center justify-center text-white text-sm">Gray</div>
          </div>
        </div>
        
        {/* Test responsive */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Responsive Test</h2>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm md:text-base lg:text-lg xl:text-xl">
              This text changes size based on screen size:
              <span className="block mt-2">
                <span className="sm:hidden">📱 Mobile</span>
                <span className="hidden sm:inline md:hidden">📱 Small</span>
                <span className="hidden md:inline lg:hidden">💻 Medium</span>
                <span className="hidden lg:inline xl:hidden">💻 Large</span>
                <span className="hidden xl:inline">🖥️ Extra Large</span>
              </span>
            </p>
          </div>
        </div>
        
        {/* Test Tailwind classes */}
        <div className="mt-8">
          <div className="bg-red-500 text-white p-4 rounded-lg">
            If you see this with a red background, Tailwind CSS is working correctly! ✅
          </div>
        </div>
      </div>
    </div>
  );
} 