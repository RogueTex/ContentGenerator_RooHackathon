import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ContentGenerator from './components/ContentGenerator';
import CampaignGenerator from './components/CampaignGenerator';
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
        <div className="flex justify-center border-b mb-4">
          <button
            onClick={() => setActiveTab("generator")}
            className={`py-2 px-4 text-lg ${
              activeTab === "generator"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            Generator
          </button>
          <button
            onClick={() => setActiveTab("campaign")}
            className={`py-2 px-4 text-lg ${
              activeTab === "campaign"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            Campaign
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`py-2 px-4 text-lg ${
              activeTab === "history"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            History
          </button>
        </div>

        {activeTab === "generator" && (
          <>
            <Hero />
            <ContentGenerator onContentGenerated={handleContentGenerated} />
          </>
        )}
        {activeTab === "campaign" && <CampaignGenerator />}
        {activeTab === "history" && <ContentHistory generatedContents={generatedContents} />}
      </main>

      {/* Floating Navigation Pills */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 p-2 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'generator' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-magic mr-2"></i>Generator
          </button>
          <button
            onClick={() => setActiveTab('campaign')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'campaign' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-bullhorn mr-2"></i>Campaign
          </button>
          {generatedContents.length > 0 && (
            <button
              onClick={() => setActiveTab('history')}
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === 'history' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="fas fa-history mr-2"></i>History
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                {generatedContents.length}
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
