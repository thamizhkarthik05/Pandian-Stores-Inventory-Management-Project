// src/pages/Billing/ItemSelection.jsx
import React, { useState } from 'react';
import SearchBar from '../../components/common/SearchBar';

const ItemSelection = ({ items, onSelectItem }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return ( 
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Select Items</h3>
      
      <div className="mb-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search items..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {filteredItems.map(item => (
        <button
          key={item._id}
          onClick={() => item.stock > 0 && onSelectItem(item)}
          className={`text-left p-4 border-2 border-gray-200 rounded-lg transition-all
            ${
              item.stock === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer hover:border-indigo-500 hover:bg-indigo-50'
            }`}
        >
            <p className="font-semibold text-gray-800">{item.name}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">{item.category}</span>
              <span className="font-bold text-green-600">₹{item.price}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Stock: {item.stock}</p>
          </button>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No items found
        </div>
      )}
    </div>
  );
};

export default ItemSelection;