import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import TryOnResult from './components/TryOnResult';
import DressSuggestions from './components/DressSuggestions';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [userPhoto, setUserPhoto] = useState(null);
  const [dressImage, setDressImage] = useState(null);
  const [tryOnResult, setTryOnResult] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleUserPhotoUpload = (photo) => {
    setUserPhoto(photo);
    setCurrentStep(2);
  };

  const handleDressImageUpload = (image) => {
    setDressImage(image);
    setCurrentStep(3);
  };

  const handleTryOn = async (style = 'realistic') => {
    if (!userPhoto || !dressImage) return;

    setIsLoading(true);
    try {
      // Upload user photo
      const userFormData = new FormData();
      userFormData.append('userPhoto', userPhoto);

      const userResponse = await fetch('/api/upload/user', {
        method: 'POST',
        body: userFormData,
      });
      const userData = await userResponse.json();

      // Upload dress image
      const dressFormData = new FormData();
      dressFormData.append('dressImage', dressImage);

      const dressResponse = await fetch('/api/upload/dress', {
        method: 'POST',
        body: dressFormData,
      });
      const dressData = await dressResponse.json();

      // Generate try-on
      const tryOnResponse = await fetch('/api/tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPhotoPath: userData.userPhotoPath,
          dressImagePath: dressData.dressImagePath,
          style: style,
        }),
      });

      if (!tryOnResponse.ok) {
        const errorData = await tryOnResponse.json();
        throw new Error(errorData.error || `HTTP error! status: ${tryOnResponse.status}`);
      }

      const tryOnData = await tryOnResponse.json();
      setTryOnResult(tryOnData);
      setCurrentStep(4);
    } catch (error) {
      console.error('Try-on generation failed:', error);
      alert(`Failed to generate dress try-on: ${error.message}. Please check your API key and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetSuggestions = async (occasion, preferences) => {
    if (!userPhoto) return;

    setIsLoading(true);
    try {
      // Upload user photo if not already uploaded
      let userPhotoPath = userPhoto;
      if (typeof userPhoto === 'object') {
        const userFormData = new FormData();
        userFormData.append('userPhoto', userPhoto);

        const userResponse = await fetch('/api/upload/user', {
          method: 'POST',
          body: userFormData,
        });
        const userData = await userResponse.json();
        userPhotoPath = userData.userPhotoPath;
      }

      // Get suggestions
      const suggestionsResponse = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPhotoPath: userPhotoPath,
          occasion: occasion,
          preferences: preferences,
        }),
      });

      const suggestionsData = await suggestionsResponse.json();
      setSuggestions(suggestionsData.suggestions);
    } catch (error) {
      console.error('Suggestions generation failed:', error);
      alert('Failed to generate dress suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = () => {
    setUserPhoto(null);
    setDressImage(null);
    setTryOnResult(null);
    setSuggestions(null);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 1 && (
          <div className="space-y-8">
            <Hero />
            <UploadSection
              onUserPhotoUpload={handleUserPhotoUpload}
              onDressImageUpload={handleDressImageUpload}
              userPhoto={userPhoto}
              dressImage={dressImage}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Great! Now upload a dress image
              </h2>
              <p className="text-gray-600">
                Choose any dress you'd like to try on
              </p>
            </div>
            <UploadSection
              onUserPhotoUpload={handleUserPhotoUpload}
              onDressImageUpload={handleDressImageUpload}
              userPhoto={userPhoto}
              dressImage={dressImage}
              showUserPhoto={true}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to try on your dress!
              </h2>
              <p className="text-gray-600">
                Click the button below to generate your AI dress try-on
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Your Photo</h3>
                <img
                  src={URL.createObjectURL(userPhoto)}
                  alt="User"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Dress to Try On</h3>
                <img
                  src={URL.createObjectURL(dressImage)}
                  alt="Dress"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="text-center space-y-4">
              <button
                onClick={() => handleTryOn('realistic')}
                className="btn-primary text-lg px-8 py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner />
                    <span>Generating Try-On...</span>
                  </div>
                ) : (
                  'Generate Dress Try-On'
                )}
              </button>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn-secondary"
                >
                  Back
                </button>
                <button
                  onClick={resetApp}
                  className="btn-secondary"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && tryOnResult && (
          <TryOnResult
            result={tryOnResult}
            userPhoto={userPhoto}
            dressImage={dressImage}
            onReset={resetApp}
            onGetSuggestions={handleGetSuggestions}
          />
        )}

        {suggestions && (
          <DressSuggestions
            suggestions={suggestions}
            onClose={() => setSuggestions(null)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
