import React from 'react';
import { Sparkles, Camera } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                AI Dress Try-On
              </h1>
              <p className="text-sm text-gray-600">
                Powered by Google Gemini Nano & Banana AI
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How it Works
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">AI-Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
