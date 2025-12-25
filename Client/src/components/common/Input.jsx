// src/components/common/Input.jsx
// Reusable input field component with label and validation

import React from 'react';

/**
 * Input Component - Form input with label and error handling
 * @param {object} props - Component props
 * @param {string} props.label - Input label text
 * @param {string} props.type - Input type (text, number, email, etc.)
 * @param {string|number} props.value - Input value
 * @param {function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message to display
 * @param {boolean} props.required - Whether field is required
 * @param {string} props.className - Additional CSS classes
 */
const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  error,
  required = false,
  className = ''
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;