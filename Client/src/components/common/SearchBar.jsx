// src/components/common/SearchBar.jsx
// Search input component with icon

import React from 'react';
import { Search } from 'lucide-react';

/**
 * SearchBar Component - Input field with search icon
 * @param {object} props - Component props
 * @param {string} props.value - Current search value
 * @param {function} props.onChange - Change handler function
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 */
const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        size={20} 
      />
      
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default SearchBar;