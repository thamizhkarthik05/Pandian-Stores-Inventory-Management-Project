// src/pages/Billing/BillItem.jsx
import React from 'react';
import { X } from 'lucide-react';

const BillItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
        <button
          onClick={() => onRemove(item._id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Remove item"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateQuantity(item._id, item.qty - 1)}
            className="w-6 h-6 bg-gray-300 rounded hover:bg-gray-400 flex items-center justify-center font-bold text-gray-700"
          >
            -
          </button>
          
          <input
            type="number"
            value={item.qty}
            onChange={(e) => onUpdateQuantity(item._id, e.target.value)}
            className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            min="1"
          />
          
          <button
            onClick={() => onUpdateQuantity(item._id, item.qty + 1)}
            className="w-6 h-6 bg-gray-300 rounded hover:bg-gray-400 flex items-center justify-center font-bold text-gray-700"
          >
            +
          </button>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-gray-500">₹{item.price} × {item.qty}</p>
          <p className="font-bold text-green-600">₹{item.total}</p>
        </div>
      </div>
    </div>
  );
};

export default BillItem;