import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ContentGenerator from './components/ContentGenerator';
import Features from './components/Features';
import ContentHistory from './components/ContentHistory';
import Footer from './components/Footer';

function App() {
  const [generatedContents, setGeneratedContents] = useState([]);
  const [activeTab, setActiveTab] = useState('generator');

  const handleContentGenerated = (newContent) => {
    const contentWithId = {
      ...newContent,
      id: Date.now(),
      timestamp: new Date(),
    };
    setGeneratedContents(prev => [contentWithId, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="pb-20">
        {activeTab === 'generator' ? (
          <>
            <Hero />
            <ContentGenerator onContentGenerated={handleContentGenerated} />
            <Features />
          </>
        ) : (
          <ContentHistory 
            contents={generatedContents}
            onBack={() => setActiveTab('generator')}
          />
        )}
      </main>

      {/* Simple Navigation Pills */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-full shadow-2xl border border-gray-200 p-2 flex space-x-2">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              activeTab === 'generator'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Generate</span>
            </span>
          </button>
          {generatedContents.length > 0 && (
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 relative ${
                activeTab === 'history'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>History ({generatedContents.length})</span>
              </span>
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
