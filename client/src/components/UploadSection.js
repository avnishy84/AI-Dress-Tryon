import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, User, Shirt, X, Check } from 'lucide-react';

const UploadSection = ({ 
  onUserPhotoUpload, 
  onDressImageUpload, 
  userPhoto, 
  dressImage, 
  showUserPhoto = false 
}) => {
  const [dragActive, setDragActive] = useState({ user: false, dress: false });

  const onUserDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUserPhotoUpload(acceptedFiles[0]);
    }
  }, [onUserPhotoUpload]);

  const onDressDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onDressImageUpload(acceptedFiles[0]);
    }
  }, [onDressImageUpload]);

  const userDropzone = useDropzone({
    onDrop: onUserDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    onDragEnter: () => setDragActive(prev => ({ ...prev, user: true })),
    onDragLeave: () => setDragActive(prev => ({ ...prev, user: false })),
    onDropAccepted: () => setDragActive(prev => ({ ...prev, user: false })),
    onDropRejected: () => setDragActive(prev => ({ ...prev, user: false }))
  });

  const dressDropzone = useDropzone({
    onDrop: onDressDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    onDragEnter: () => setDragActive(prev => ({ ...prev, dress: true })),
    onDragLeave: () => setDragActive(prev => ({ ...prev, dress: false })),
    onDropAccepted: () => setDragActive(prev => ({ ...prev, dress: false })),
    onDropRejected: () => setDragActive(prev => ({ ...prev, dress: false }))
  });

  const removeUserPhoto = () => {
    onUserPhotoUpload(null);
  };

  const removeDressImage = () => {
    onDressImageUpload(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* User Photo Upload */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Your Photo</h3>
            {userPhoto && (
              <div className="flex items-center space-x-1 text-green-600">
                <Check className="h-4 w-4" />
                <span className="text-sm">Uploaded</span>
              </div>
            )}
          </div>

          {!userPhoto ? (
            <div
              {...userDropzone.getRootProps()}
              className={`upload-area ${dragActive.user ? 'dragover' : ''} ${
                userDropzone.isDragActive ? 'border-primary-500 bg-primary-50' : ''
              }`}
            >
              <input {...userDropzone.getInputProps()} />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drag & drop your photo here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supports: JPG, PNG, WebP (max 10MB)
              </p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={URL.createObjectURL(userPhoto)}
                alt="User"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={removeUserPhoto}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {userDropzone.fileRejections.length > 0 && (
            <div className="mt-2 text-sm text-red-600">
              {userDropzone.fileRejections[0].errors[0].message}
            </div>
          )}
        </div>

        {/* Dress Image Upload */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Shirt className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold">Dress Image</h3>
            {dressImage && (
              <div className="flex items-center space-x-1 text-green-600">
                <Check className="h-4 w-4" />
                <span className="text-sm">Uploaded</span>
              </div>
            )}
          </div>

          {!dressImage ? (
            <div
              {...dressDropzone.getRootProps()}
              className={`upload-area ${dragActive.dress ? 'dragover' : ''} ${
                dressDropzone.isDragActive ? 'border-primary-500 bg-primary-50' : ''
              }`}
            >
              <input {...dressDropzone.getInputProps()} />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drag & drop a dress image here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supports: JPG, PNG, WebP (max 10MB)
              </p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={URL.createObjectURL(dressImage)}
                alt="Dress"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={removeDressImage}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {dressDropzone.fileRejections.length > 0 && (
            <div className="mt-2 text-sm text-red-600">
              {dressDropzone.fileRejections[0].errors[0].message}
            </div>
          )}
        </div>
      </div>

      {showUserPhoto && userPhoto && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <Check className="h-4 w-4" />
            <span>User photo uploaded successfully!</span>
          </div>
        </div>
      )}

      {userPhoto && dressImage && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            <Check className="h-4 w-4" />
            <span>Both images uploaded! Ready to generate try-on.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
