import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import BusinessCardPreview from './BusinessCardPreview';
import BusinessCardForm from './BusinessCardForm';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: ''
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const [customElements, setCustomElements] = useState([]);
  const [customBackground, setCustomBackground] = useState('#ffffff');


  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleCustomTemplate = (elements, background) => {
    setCustomElements(elements);
    setCustomBackground(background);
  };



  return (
    <div className="min-h-screen bg-radial from-red-500 to-red-50 ">

      {/* Main Content */}
      <div className="mx-auto sm:px-6 lg:px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <BusinessCardForm 
              formData={formData}
              onInputChange={handleInputChange}
            />            
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2">
            {/* <BusinessCardPreview 
              formData={formData}
              template={selectedTemplate}
            /> */}
            <BusinessCardPreview 
              formData={formData}
              template={selectedTemplate}
              customElements={customElements}
              customBackground={customBackground}
            />
            <div className="lg:col-span-2 mt-2">
              {/* <TemplateSelector 
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
              /> */}
              <TemplateSelector 
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
                formData={formData}
                onCustomTemplate={handleCustomTemplate}
              />

            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;