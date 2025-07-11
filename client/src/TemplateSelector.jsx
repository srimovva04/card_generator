
import React, { useState } from 'react';
import CustomTemplateEditor from './CustomTemplateEditor';
import { Palette } from 'lucide-react';

const templates = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
  { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
  { id: 'creative', name: 'Creative', description: 'Bold and artistic design' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' },
  { id: 'custom', name: 'Custom', description: 'Design your own layout' }
];

const TemplateSelector = ({ selectedTemplate, onTemplateChange, formData, onCustomTemplate }) => {
  const [showCustomEditor, setShowCustomEditor] = useState(false);

  const getTemplateStyle = (templateId) => {
    return selectedTemplate === templateId
      ? 'border-red-500 bg-red-50 shadow-lg'
      : 'border-gray-200 hover:border-gray-300';
  };

  const handleTemplateClick = (templateId) => {
    if (templateId === 'custom') {
      setShowCustomEditor(true);
    } else {
      onTemplateChange(templateId);
    }
  };

  const handleCustomTemplateSave = (elements, background) => {
    setShowCustomEditor(false);
    onTemplateChange('custom');
    if (onCustomTemplate) {
      onCustomTemplate(elements, background);
    }
  };

  return (
    <>
      <div className="inline-block  rounded-2xl border-2 p-4 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Template</h2>
        <div className="w-full overflow-x-auto">
        <div className="inline-flex gap-4 items-stretch">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateClick(template.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-lg relative ${getTemplateStyle(template.id)}`}
            >
              {template.id === 'custom' ? (
                <div className="flex items-center gap-2 mb-1">
                  <Palette className="w-4 h-4" />
                  <h3 className="font-semibold text-gray-800">{template.name}</h3>
                </div>
              ) : (
                <h3 className="font-semibold text-gray-800">{template.name}</h3>
              )}
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </button>
          ))}
        </div>
      </div>
      </div>
        {showCustomEditor && (
        <CustomTemplateEditor
          formData={formData}
          onSave={handleCustomTemplateSave}
          onClose={() => setShowCustomEditor(false)}
        />
      )}
    </>
  );
};

export default TemplateSelector;





// import React from 'react';

// const templates = [
//   { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
//   { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
//   { id: 'creative', name: 'Creative', description: 'Bold and artistic design' },
//   { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' },
//   { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
//   { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
//   { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
//   { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
// ];

// const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
//   return (
//     <div className="inline-block bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Template</h2>
//       <div className="w-full overflow-x-auto">
//       <div className="inline-flex gap-4 min-w-max">
//         {templates.map((template) => (
//           <button
//             key={template.id}
//             onClick={() => onTemplateChange(template.id)}
//             className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-lg ${
//               selectedTemplate === template.id
//                 ? 'border-blue-500 bg-blue-50 shadow-lg'
//                 : 'border-gray-200 hover:border-gray-300'
//             }`}
//           >
//             <h3 className="font-semibold text-gray-800">{template.name}</h3>
//             <p className="text-sm text-gray-600 mt-1">{template.description}</p>
//           </button>
//         ))}
//       </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSelector;
