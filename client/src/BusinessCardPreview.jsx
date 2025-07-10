import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

import QRCode from 'react-qr-code';

const BusinessCardPreview = ({ formData, template }) => {


const [isDownloading, setIsDownloading] = useState(false);

const downloadCard = async () => {
  setIsDownloading(true);
  const element = document.getElementById('business-card');
  if (!element) return;

  try {
    const dataUrl = await domtoimage.toPng(element, {
      quality: 1,
      style: {
        transform: 'none',
      }
    });

    const link = document.createElement('a');
    link.download = `business-card-${formData.name || 'card'}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error downloading card:', error);
  } finally {
    setIsDownloading(false);
  }
};


  const renderModernTemplate = () => (
    <div className="w-96 h-56 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6 flex justify-between rounded-lg shadow-2xl">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-1">{formData.name || 'Your Name'}</h1>
        <p className="text-blue-100 mb-4">{formData.title || 'Your Title'}</p>
        <div className="space-y-1 text-sm">
          <p>{formData.company || 'Company Name'}</p>
          <p>{formData.email || 'email@example.com'}</p>
          <p>{formData.phone || '+1 (555) 123-4567'}</p>
        </div>
      </div>
      <div className="ml-4">
        <QRCode value={formData.website} size={80} bgColor="transparent" fgColor="white" />
      </div>
    </div>
  );

  const renderClassicTemplate = () => (
    <div className="w-96 h-56 bg-white border-2 border-gray-800 text-gray-800 p-6 flex justify-between rounded-lg shadow-2xl">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-1 text-gray-800">{formData.name || 'Your Name'}</h1>
        <div className="w-16 h-0.5 bg-gray-800 mb-3"></div>
        <p className="text-gray-600 mb-3 font-medium">{formData.title || 'Your Title'}</p>
        <div className="space-y-1 text-sm">
          <p className="font-semibold">{formData.company || 'Company Name'}</p>
          <p>{formData.email || 'email@example.com'}</p>
          <p>{formData.phone || '+1 (555) 123-4567'}</p>
          {/* {formData.website && <p>{formData.website}</p>} */}
        </div>
      </div>
      <div className="ml-4">
        <QRCode value={formData.website} size={80} />
      </div>
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="w-96 h-56 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white p-6 flex justify-between rounded-lg shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="flex-1 relative z-10">
        <h1 className="text-2xl font-bold mb-1">{formData.name || 'Your Name'}</h1>
        <p className="text-yellow-100 mb-4 font-medium">{formData.title || 'Your Title'}</p>
        <div className="space-y-1 text-sm">
          <p className="font-semibold">{formData.company || 'Company Name'}</p>
          <p>{formData.email || 'email@example.com'}</p>
          <p>{formData.phone || '+1 (555) 123-4567'}</p>
          {/* {formData.website && <p>{formData.website}</p>} */}
        </div>
      </div>
      <div className="ml-4 relative z-10">
        <div className="bg-white p-2 rounded">
          <QRCode value={formData.website} size={64} />
        </div>
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className="w-96 h-56 bg-gray-50 border border-gray-200 text-gray-800 p-8 flex justify-between rounded-lg shadow-2xl">
      <div className="flex-1">
        <h1 className="text-xl font-light mb-2 text-gray-900">{formData.name || 'Your Name'}</h1>
        <p className="text-gray-500 mb-6 text-sm">{formData.title || 'Your Title'}</p>
        <div className="space-y-2 text-xs text-gray-600">
          <p>{formData.company || 'Company Name'}</p>
          <p>{formData.email || 'email@example.com'}</p>
          <p>{formData.phone || '+1 (555) 123-4567'}</p>
          {/* {formData.website && <p>{formData.website}</p>} */}
        </div>
      </div>
      <div className="ml-4">
        <QRCode value={formData.website} size={72} />
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return renderClassicTemplate();
      case 'creative':
        return renderCreativeTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="rounded-2xl  p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Live Preview</h2>
      
      <div className="flex justify-center mb-6">
        <div id="business-card" className="transform hover:scale-105 transition-transform duration-300">
          {renderTemplate()}
        </div>
      </div>



              <div className="text-center">
                <button
                  onClick={downloadCard}
                  disabled={isDownloading || !formData.name}
                  className="inline-flex items-center px-8 py-4 bg-blue-950 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  {isDownloading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      Download
                    </>
                  )}
                </button>
                
                {!formData.name && (
                  <p className="mt-3 text-sm text-gray-500">
                    Please fill in your name to download the card
                  </p>
                )}
              </div>

    
    </div>
  );
};

export default BusinessCardPreview;
