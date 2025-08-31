import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ContentHistory = ({ generatedContents, onBack }) => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredContents = (generatedContents || []).filter(content => {
    if (!content || !content.topic || !content.content) {
      return false; // Ignore invalid content entries
    }
    const matchesSearch = content.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || content.contentType === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Invalid date';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getContentTypeIcon = (type) => {
    const icons = {
      'blog-post': '📝',
      'social-media-post': '📱',
      'email-newsletter': '📧',
      'product-description': '🛍️',
      'press-release': '📰',
      'ad-copy': '📢',
      'video-script': '🎬',
      'landing-page': '🌐',
    };
    return icons[type] || '📄';
  };

  const getContentTypeLabel = (type) => {
    if (!type) return 'Unknown';
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const exportContent = (content, format = 'txt') => {
    const text = `${content.topic}\n\nContent Type: ${getContentTypeLabel(content.contentType)}\nTone: ${content.tone}\nLength: ${content.length}\nGenerated: ${formatDate(content.timestamp)}\n\n${content.content}`;
    
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${content.topic.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}.${format}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const uniqueContentTypes = [...new Set((generatedContents || []).map(c => c.contentType).filter(Boolean))];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Content History</h2>
            <p className="text-lg text-gray-600">
              Manage and revisit all your generated content
            </p>
          </div>
          <button
            onClick={onBack}
            className="btn-secondary flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Generator</span>
          </button>
        </div>

        {(generatedContents || []).length === 0 ? (
          <div className="content-card p-12 text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Content Yet</h3>
            <p className="text-gray-600 mb-6">Start generating content to see your history here.</p>
            <button
              onClick={onBack}
              className="btn-primary"
            >
              Generate Your First Content
            </button>
          </div>
        ) : (
          <>
            {/* Search and Filter */}
            <div className="content-card p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search content by topic or content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    {uniqueContentTypes.map(type => (
                      <option key={type} value={type}>
                        {getContentTypeLabel(type)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  {filteredContents.length} of {(generatedContents || []).length} items
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Total words:</span>
                  <span className="text-sm font-semibold text-primary-600">
                    {(generatedContents || []).reduce((sum, content) => sum + ((content?.content?.split(' ').length) || 0), 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {filteredContents.length === 0 ? (
              <div className="content-card p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Content List */}
                <div className="space-y-4">
                  {filteredContents.map((content) => (
                    <div
                      key={content.id}
                      onClick={() => setSelectedContent(content)}
                      className={`content-card p-6 cursor-pointer transition-all duration-200 ${
                        selectedContent?.id === content.id
                          ? 'ring-2 ring-primary-500 shadow-xl'
                          : 'hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getContentTypeIcon(content.contentType)}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900 line-clamp-1">
                              {content.topic}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {getContentTypeLabel(content.contentType)} • {content.tone} • {content.length}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(content.content);
                            }}
                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                            title="Copy content"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              exportContent(content);
                            }}
                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                            title="Export content"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {content.content ? content.content.substring(0, 120) : ''}...
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDate(content.timestamp)}</span>
                        <span>{content.content ? content.content.split(' ').length : 0} words</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Content Preview */}
                <div className="lg:sticky lg:top-8">
                  {selectedContent ? (
                    <div className="content-card p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getContentTypeIcon(selectedContent.contentType)}</span>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {selectedContent.topic}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {getContentTypeLabel(selectedContent.contentType)} • {selectedContent.tone} • {selectedContent.length}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedContent(null)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="prose prose-sm max-w-none mb-6">
                        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto text-sm">
                          <ReactMarkdown>{selectedContent.content || ''}</ReactMarkdown>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                          <p>Generated: {formatDate(selectedContent.timestamp)}</p>
                          <p>{selectedContent.content ? selectedContent.content.split(' ').length : 0} words</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => copyToClipboard(selectedContent.content)}
                            className="btn-secondary flex items-center space-x-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy</span>
                          </button>
                          <button
                            onClick={() => exportContent(selectedContent)}
                            className="btn-primary flex items-center space-x-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Export</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="content-card p-12 text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Content to Preview</h3>
                      <p className="text-gray-600 text-sm">Click on any content item to view the full details.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ContentHistory;
