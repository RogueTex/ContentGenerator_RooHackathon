import React, { useState } from 'react';
import axios from 'axios';

const CampaignGenerator = () => {
  const [topic, setTopic] = useState('');
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateCampaign = async () => {
    if (!topic) {
      setError('Please enter a topic to generate a campaign.');
      return;
    }
    setError('');
    setLoading(true);
    setCampaign(null);
    try {
      const response = await axios.post('/api/generate-campaign', { topic });
      setCampaign(response.data.generatedCampaign);
    } catch (err) {
      setError('Failed to generate campaign. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Social Media Campaign Generator</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., 'new coffee blend')"
          className="flex-grow p-2 border rounded-md"
        />
        <button
          onClick={handleGenerateCampaign}
          disabled={loading}
          className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 disabled:bg-primary-300"
        >
          {loading ? 'Generating...' : 'Generate Campaign'}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {loading && (
        <div className="text-center p-8">
          <p>Generating your campaign...</p>
        </div>
      )}

      {campaign && (
        <div className="space-y-8 animate-fade-in">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Social Media Posts</h3>
            <div className="space-y-4">
              {campaign.socialPosts.map((p, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <p className="mb-1">{p.post}</p>
                  <p className="text-sm text-primary-600 font-medium">{p.hashtags.join(' ')}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Blog Post Idea</h3>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="font-bold text-lg">{campaign.blogIdea.title}</h4>
              <p>{campaign.blogIdea.summary}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Email Subject Line</h3>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="font-medium">"{campaign.emailSubject}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignGenerator;
