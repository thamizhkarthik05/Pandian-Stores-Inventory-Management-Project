// src/components/common/Card.jsx
// Reusable card wrapper component with consistent styling

import React from 'react';

/**
 * Card Component - A container with rounded corners and shadow
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Enable hover effect
 * @param {function} props.onClick - Click handler (makes card clickable)
 */
const Card = ({ children, className = '', hover = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md p-6 ${
        hover ? 'hover:shadow-lg transition-shadow duration-300 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;