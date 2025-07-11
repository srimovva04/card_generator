import React from 'react';

const BusinessCardForm = ({ formData, onInputChange }) => {
  return (
    <div className="bg-white rounded-2xl border-r-4 border-red-700 p-5">
      <h2 className="text-2xl font-bold text-red-800 mb-2">Card Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-red-700 py-3  ">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-red-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-red-700 py-3 ">
            Job Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-red-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-red-700 py-3 ">
            Company *
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => onInputChange('company', e.target.value)}
            className="w-full px-4 py-3 border border-red-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Tech Corp"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-red-700 py-3 ">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-red-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-red-700 py-3 ">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-red-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-red-700 py-3 ">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => onInputChange('website', e.target.value)}
            className="w-full px-4 py-3 border border-red-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="https://example.com"
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-red-700 py-3 ">
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => onInputChange('address', e.target.value)}
            className="w-full px-4 py-3 border border-red-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="123 Main St, City, State 12345"
          />
        </div> */}

      </div>
    </div>
  );
};

export default BusinessCardForm;
