import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-2 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                  AI Content Generator
                </h3>
                <p className="text-gray-400 text-sm">Powered by Requesty • Roo Hackathon 2025</p>
              </div>
            </div>
            <p className="text-gray-300 max-w-md leading-relaxed mb-6">
              Built for the Roo Hackathon 2025. Transform your content creation process with 
              Requesty AI technology. Generate high-quality, engaging content for any purpose in seconds.
            </p>
            <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg px-4 py-2 inline-block">
              <span className="text-white font-semibold text-sm">Roo Hackathon 2025</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Powered By</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Requesty API
                </span>
              </li>
              <li>
                <span className="text-gray-300 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  React + Vite
                </span>
              </li>
              <li>
                <span className="text-gray-300 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  Node.js + Express
                </span>
              </li>
            </ul>
          </div>

          {/* Content Types */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Content Types</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300">Blog Posts</span>
              </li>
              <li>
                <span className="text-gray-300">Social Media</span>
              </li>
              <li>
                <span className="text-gray-300">Email Campaigns</span>
              </li>
              <li>
                <span className="text-gray-300">+ 5 More Types</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} AI Content Generator. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">Requesty AI</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <span>Built for </span>
              <span className="text-primary-400 font-semibold">Roo Hackathon 2025</span>
              <span> with ❤️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="h-1 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600"></div>
    </footer>
  );
};

export default Footer;
