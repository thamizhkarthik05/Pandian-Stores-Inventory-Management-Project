// src/components/dashboard/SummaryCard.jsx
// Card component for displaying summary statistics on dashboard

import React from 'react';

/**
 * SummaryCard Component - Displays a metric with icon
 * @param {object} props - Component props
 * @param {string} props.title - Card title/label
 * @param {string|number} props.value - Main value to display
 * @param {React.Component} props.icon - Lucide icon component
 * @param {string} props.color - Background color for icon (Tailwind classes)
 * @param {string} props.subtitle - Optional subtitle text
 */
const SummaryCard = ({ title, value, icon: Icon, color, subtitle }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className={`p-4 rounded-full ${color}`}>
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;