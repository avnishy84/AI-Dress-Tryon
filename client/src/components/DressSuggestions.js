import React from 'react';
import { X, Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';

const DressSuggestions = ({ suggestions, onClose }) => {
  if (!suggestions || !suggestions.suggestions) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Dress Suggestions</h3>
            <p className="text-gray-600">AI-powered recommendations just for you</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.suggestions.map((suggestion, index) => (
            <div key={suggestion.id || index} className="card hover:shadow-lg transition-shadow">
              <div className="relative mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">AI Suggestion</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <button className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{suggestion.style}</h4>
                  <p className="text-sm text-gray-600">{suggestion.color}</p>
                </div>

                <p className="text-sm text-gray-700 line-clamp-3">
                  {suggestion.description}
                </p>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>Perfect for {suggestion.occasion}</span>
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-800 font-medium mb-1">Why this works:</p>
                  <p className="text-xs text-blue-700">{suggestion.reasoning}</p>
                </div>

                <div className="flex space-x-2">
                  <button className="btn-primary flex-1 text-sm py-2">
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Find Similar
                  </button>
                  <button className="btn-secondary text-sm py-2 px-3">
                    Try On
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-purple-900">AI-Powered Recommendations</span>
            </div>
            <p className="text-sm text-purple-700">
              These suggestions are generated using Google Gemini Nano AI based on your photo and preferences.
              Each recommendation is tailored to your body type, style, and the occasion you specified.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close Suggestions
          </button>
        </div>
      </div>
    </div>
  );
};

export default DressSuggestions;
