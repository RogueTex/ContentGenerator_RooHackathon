import React, { useState } from 'react';

const ContentGenerator = ({ onContentGenerated }) => {
  const [contentType, setContentType] = useState('');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const contentTypes = [
    { value: 'blog-post', label: 'Blog Post', icon: '📝', description: 'In-depth articles and guides' },
    { value: 'social-media-post', label: 'Social Media Post', icon: '📱', description: 'Engaging social content' },
    { value: 'email-newsletter', label: 'Email Newsletter', icon: '📧', description: 'Professional email content' },
    { value: 'product-description', label: 'Product Description', icon: '🛍️', description: 'Compelling product copy' },
    { value: 'press-release', label: 'Press Release', icon: '📰', description: 'Official announcements' },
    { value: 'ad-copy', label: 'Advertisement Copy', icon: '📢', description: 'Persuasive ad content' },
    { value: 'video-script', label: 'Video Script', icon: '🎬', description: 'Engaging video content' },
    { value: 'landing-page', label: 'Landing Page Copy', icon: '🌐', description: 'Conversion-focused copy' },
  ];

  const tones = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and friendly' },
    { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic and exciting' },
    { value: 'informative', label: 'Informative', description: 'Educational and factual' },
    { value: 'persuasive', label: 'Persuasive', description: 'Convincing and compelling' },
    { value: 'humorous', label: 'Humorous', description: 'Light-hearted and funny' },
  ];

  const lengths = [
    { value: 'short', label: 'Short', description: '100-200 words' },
    { value: 'medium', label: 'Medium', description: '300-500 words' },
    { value: 'long', label: 'Long', description: '600-1000 words' },
  ];

  const generateContent = async (e) => {
    e.preventDefault();
    
    if (!contentType || !topic) {
      setError('Please select a content type and enter a topic.');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedContent('');

    try {
      const enhancedPrompt = `Create a ${length} ${contentType.replace('-', ' ')} about "${topic}" with a ${tone} tone. 
      
      Requirements:
      - Length: ${lengths.find(l => l.value === length)?.description}
      - Tone: ${tone}
      - Format: Well-structured with appropriate headings and paragraphs
      - Make it engaging and relevant to the target audience
      - Include actionable insights where appropriate`;

      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/content/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType: enhancedPrompt,
          topic: topic,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Catch if JSON parsing fails
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setGeneratedContent(data.generatedContent);
      
      if (onContentGenerated) {
        onContentGenerated({
          contentType: contentType,
          topic: topic,
          tone: tone,
          length: length,
          content: data.generatedContent,
        });
      }

    } catch (err) {
      setError(err.message || 'An unknown error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      // You could add a toast notification here for better UX
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Your Content
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your content type, specify your topic, and let AI create amazing content for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <div className="space-y-8">
            <div className="p-8">
              <form onSubmit={generateContent} className="space-y-6">
                {/* Content Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Content Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {contentTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setContentType(type.value)}
                        className={`p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                          contentType === type.value
                            ? 'border-primary-500 bg-primary-50 shadow-lg'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-primary-25'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">{type.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">{type.label}</div>
                            <div className="text-sm text-gray-500">{type.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topic Input */}
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                    Topic / Subject *
                  </label>
                  <textarea
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your topic or provide a brief description of what you want to write about..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-200"
                  />
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tone & Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {tones.map((toneOption) => (
                      <button
                        key={toneOption.value}
                        type="button"
                        onClick={() => setTone(toneOption.value)}
                        className={`p-3 text-center rounded-lg border-2 transition-all duration-200 ${
                          tone === toneOption.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="font-medium text-sm">{toneOption.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{toneOption.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Length Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Content Length
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {lengths.map((lengthOption) => (
                      <button
                        key={lengthOption.value}
                        type="button"
                        onClick={() => setLength(lengthOption.value)}
                        className={`p-3 text-center rounded-lg border-2 transition-all duration-200 ${
                          length === lengthOption.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="font-medium text-sm">{lengthOption.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{lengthOption.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-red-700">{error}</span>
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={isLoading || !contentType || !topic}
                  className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 transform ${
                    isLoading || !contentType || !topic
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Generating...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Generate Content</span>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Generated Content */}
          <div className="space-y-6">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Generated Content</h3>
                {generatedContent && (
                  <button
                    onClick={copyToClipboard}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </button>
                )}
              </div>

              <div className="min-h-96">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-96 space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-gray-500 text-center">
                      AI is crafting your content...
                    </p>
                  </div>
                ) : generatedContent ? (
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-gray-50 rounded-lg p-6 whitespace-pre-wrap font-serif leading-relaxed text-gray-800">
                      {generatedContent}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-lg font-medium">Ready to create amazing content?</p>
                      <p className="text-gray-400">Fill out the form and click "Generate Content"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentGenerator;
