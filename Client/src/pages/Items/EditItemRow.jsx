// src/pages/Items/EditItemRow.jsx
import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const EditItemRow = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    if (formData.name && formData.price > 0 && formData.stock >= 0 && formData.category) {
      onSave({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
    } else {
      alert('Please fill all fields correctly');
    }
  };

  return (
    <tr className="bg-blue-50">
      <td className="px-6 py-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={formData.price}
          onChange={(e) => handleChange('price', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          step="0.01"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={formData.stock}
          onChange={(e) => handleChange('stock', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            title="Save"
          >
            <Save size={18} />
          </button>
          <button
            onClick={onCancel}
            className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            title="Cancel"
          >
            <X size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EditItemRow;