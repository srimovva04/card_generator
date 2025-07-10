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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

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
            <BusinessCardPreview 
              formData={formData}
              template={selectedTemplate}
            />
            <div className="lg:col-span-2 mt-2">
              <TemplateSelector 
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
              />
            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// import QRCode from 'react-qr-code';
// import html2canvas from 'html2canvas';

// function App() {
//   const [formData, setFormData] = useState({
//     name: '',
//     title: '',
//     company: '',
//     email: '',
//     phone: '',
//     website: '',
//     template: 'template1',
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const downloadCard = () => {
//     const card = document.getElementById('preview');
//     html2canvas(card).then((canvas) => {
//       const link = document.createElement('a');
//       link.download = 'business-card.png';
//       link.href = canvas.toDataURL();
//       link.click();
//     });
//   };

//   const { name, title, company, email, phone, website, template } = formData;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
//       <form className="w-full max-w-md bg-white shadow-md rounded p-6 space-y-4">
//         <input className="w-full border px-4 py-2 rounded" name="name" placeholder="Name" onChange={handleChange} />
//         <input className="w-full border px-4 py-2 rounded" name="title" placeholder="Title" onChange={handleChange} />
//         <input className="w-full border px-4 py-2 rounded" name="company" placeholder="Company" onChange={handleChange} />
//         <input className="w-full border px-4 py-2 rounded" name="email" placeholder="Email" onChange={handleChange} />
//         <input className="w-full border px-4 py-2 rounded" name="phone" placeholder="Phone" onChange={handleChange} />
//         <input className="w-full border px-4 py-2 rounded" name="website" placeholder="Website" onChange={handleChange} />
//         <select name="template" onChange={handleChange} className="w-full border px-4 py-2 rounded">
//           <option value="template1">Classic</option>
//           <option value="template2">Modern Dark</option>
//         </select>
//       </form>

//       <div id="preview" className={`mt-6 w-96 h-auto p-6 rounded shadow-md ${template === 'template1' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
//         <h2 className="text-xl font-bold">{name}</h2>
//         <p>{title}</p>
//         <p>{company}</p>
//         <p>{email}</p>
//         <p>{phone}</p>
//         {/* <p>{website}</p> */}
//         <div className="mt-4">
//           <QRCode value={website || 'https://example.com'} />
//         </div>
//       </div>

//       <button
//         onClick={downloadCard}
//         className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Download Card
//       </button>
//     </div>
//   );
// }

// export default App;


// // function App() {
// //   return(
// //     <div className="text-2xl text-red-400">
// //       hello there 
// //     </div>
// //   );
  
// // }

// // export default App;