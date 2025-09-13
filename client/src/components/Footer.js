import React from 'react';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">AI Dress Try-On</h3>
                <p className="text-sm text-gray-600">Powered by Advanced AI</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Experience the future of fashion with our AI-powered dress try-on technology. 
              Try on any dress virtually using Google Gemini Nano and Banana AI.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@example.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>AI Dress Try-On</li>
              <li>Smart Suggestions</li>
              <li>Real-time Processing</li>
              <li>High-Quality Results</li>
              <li>Multiple Styles</li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Technology</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Google Gemini Nano</li>
              <li>Banana AI</li>
              <li>React & Node.js</li>
              <li>Advanced Image Processing</li>
              <li>Machine Learning</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4 md:mb-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>using AI technology</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2024 AI Dress Try-On. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
