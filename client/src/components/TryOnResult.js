import React, { useState } from 'react';
import { Download, Share2, RefreshCw, Sparkles, Heart, Star } from 'lucide-react';

const TryOnResult = ({ result, userPhoto, dressImage, onReset, onGetSuggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [occasion, setOccasion] = useState('casual');
  const [preferences, setPreferences] = useState({
    colors: '',
    styles: '',
    budget: ''
  });

  const handleDownload = () => {
    // In a real implementation, you would download the actual result image
    const link = document.createElement('a');
    link.href = result.resultPath || '#';
    link.download = 'dress-tryon-result.png';
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My AI Dress Try-On Result',
          text: 'Check out my AI-generated dress try-on!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleGetSuggestions = () => {
    onGetSuggestions(occasion, preferences);
    setShowSuggestions(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-medium mb-4">
          <Sparkles className="h-5 w-5" />
          <span>Dress Try-On Generated Successfully!</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Here's How You Look
        </h2>
        <p className="text-gray-600">
          Your AI-generated dress try-on result is ready
        </p>
      </div>

      {/* Result Display */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Original Images */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>Your Photo</span>
            </h3>
            <img
              src={URL.createObjectURL(userPhoto)}
              alt="User"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span>Dress Image</span>
            </h3>
            <img
              src={URL.createObjectURL(dressImage)}
              alt="Dress"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* AI Result */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>AI Try-On Result</span>
              <div className="flex items-center space-x-1 ml-auto">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600">AI Generated</span>
              </div>
            </h3>
            
            <div className="relative">
              <img
                src={result.resultPath || '/api/placeholder/512/768'}
                alt="Try-on Result"
                className="w-full h-96 object-cover rounded-lg border-2 border-dashed border-gray-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              
              {/* Result Stats */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-gray-600">Confidence: 85%</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="text-gray-600">AI Enhanced</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              
              <button
                onClick={handleShare}
                className="btn-secondary flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              
              <button
                onClick={() => setShowSuggestions(true)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>Get Suggestions</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions Modal */}
      {showSuggestions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Get Dress Suggestions</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="input-field"
                >
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="party">Party</option>
                  <option value="work">Work</option>
                  <option value="date">Date Night</option>
                  <option value="wedding">Wedding</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Preferences
                </label>
                <input
                  type="text"
                  value={preferences.colors}
                  onChange={(e) => setPreferences(prev => ({ ...prev, colors: e.target.value }))}
                  placeholder="e.g., blue, red, black"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style Preferences
                </label>
                <input
                  type="text"
                  value={preferences.styles}
                  onChange={(e) => setPreferences(prev => ({ ...prev, styles: e.target.value }))}
                  placeholder="e.g., elegant, modern, vintage"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <input
                  type="text"
                  value={preferences.budget}
                  onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="e.g., $50-100, under $200"
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleGetSuggestions}
                className="btn-primary flex-1"
              >
                Get Suggestions
              </button>
              <button
                onClick={() => setShowSuggestions(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={onReset}
            className="btn-primary flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Another Dress</span>
          </button>
        </div>
        
        <p className="text-sm text-gray-500">
          Want to try a different dress? Upload new images and generate another try-on!
        </p>
      </div>
    </div>
  );
};

export default TryOnResult;
