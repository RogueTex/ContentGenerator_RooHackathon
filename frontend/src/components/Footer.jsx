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
              </div>
            </div>
            <p className="text-gray-300 max-w-md leading-relaxed mb-6">
              Built by Raghu, Tommy and Gabriel from UT Austin.
            </p>
            <p className="text-gray-300 max-w-md leading-relaxed mb-6">
              Contact: <a href="mailto:raghu.s@utexas.edu" className="text-primary-400 hover:underline">raghu.s@utexas.edu</a>
            </p>
          </div>

          {/* Empty div to balance grid layout if needed, or remove if not */}
          <div></div>
          <div></div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} AI Content Generator. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="h-1 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600"></div>
    </footer>
  );
};

export default Footer;
