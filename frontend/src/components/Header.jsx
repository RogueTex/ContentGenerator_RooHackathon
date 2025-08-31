import React from 'react';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-2 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Content Genie
              </h1>
              <p className="text-sm text-gray-500">Powered by Requesty • Roo Hackathon 2025</p>
            </div>
          </div>

          {/* Hackathon Badge */}
          <div className="hidden md:flex items-center">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-full px-4 py-2">
              <span className="text-orange-800 text-sm font-semibold flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Roo Hackathon Entry</span>
              </span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-sm font-medium">Requesty AI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
