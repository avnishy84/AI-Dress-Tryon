import React from 'react';
import { Sparkles, Camera, Wand2, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section className="text-center py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Powered by Advanced AI Technology</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Try On Any Dress with
            <span className="gradient-text block">AI Magic</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your photo and any dress image to see how you'd look. 
            Our AI combines Google Gemini Nano and Banana AI for realistic results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="card text-center">
            <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
              <Camera className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Photos</h3>
            <p className="text-gray-600 text-sm">
              Upload your photo and any dress you want to try on
            </p>
          </div>

          <div className="card text-center">
            <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
              <Wand2 className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Processing</h3>
            <p className="text-gray-600 text-sm">
              Our AI analyzes and combines the images for realistic results
            </p>
          </div>

          <div className="card text-center">
            <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Get Results</h3>
            <p className="text-gray-600 text-sm">
              Download your AI-generated dress try-on image
            </p>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose Our AI Dress Try-On?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Realistic Results</h4>
                  <p className="text-gray-600 text-sm">
                    Advanced AI technology ensures natural-looking try-on results
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Any Dress Style</h4>
                  <p className="text-gray-600 text-sm">
                    Try on any dress from casual to formal, any color or style
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fast Processing</h4>
                  <p className="text-gray-600 text-sm">
                    Get results in seconds with our optimized AI pipeline
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Smart Suggestions</h4>
                  <p className="text-gray-600 text-sm">
                    Get AI-powered dress recommendations based on your style
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
