// src/components/dashboard/LowStockAlert.jsx
// Component to display items with low stock levels

import React from 'react';

/**
 * LowStockAlert Component - Shows items below stock threshold
 * @param {object} props - Component props
 * @param {Array} props.items - Array of item objects
 * @param {number} props.threshold - Stock level threshold (default: 50)
 */
const LowStockAlert = ({ items = [], threshold = 5 }) => {
  const lowStockItems = items.filter(
    (item) => item.stock < threshold
  );
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Low Stock Items
      </h3>
      
      <div className="space-y-3">
        {lowStockItems.map(item => (
          <div 
            key={item._id} 
            className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500"
          >
            <div>
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-500">{item.category}</p>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-red-600">{item.stock} left</p>
              <p className="text-xs text-gray-500">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      {lowStockItems.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          All items are well stocked! 🎉
        </p>
      )}
    </div>
  );
};

export default LowStockAlert;