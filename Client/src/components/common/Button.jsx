// src/components/common/Button.jsx
// Reusable button component with multiple variants and sizes

import React from 'react';

/**
 * Button Component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button style variant (primary, secondary, danger, success)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {function} props.onClick - Click handler
 * @param {string} props.type - Button type attribute
 * @param {string} props.className - Additional CSS classes
 * @param {React.Component} props.icon - Lucide icon component
 * @param {boolean} props.disabled - Disabled state
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  type = 'button',
  className = '',
  icon: Icon,
  disabled = false
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md',
    secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
    success: 'bg-green-600 text-white hover:bg-green-700 shadow-md',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export default Button;