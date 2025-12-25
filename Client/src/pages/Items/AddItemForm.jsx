// src/pages/Items/AddItemForm.jsx
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const AddItemForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Item</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          label="Item Name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g., Rice (1kg)"
          error={errors.name}
          required
        />
        
        <Input
          label="Price (₹)"
          type="number"
          value={formData.price}
          onChange={(e) => handleChange('price', e.target.value)}
          placeholder="0.00"
          error={errors.price}
          required
        />
        
        <Input
          label="Stock Quantity"
          type="number"
          value={formData.stock}
          onChange={(e) => handleChange('stock', e.target.value)}
          placeholder="0"
          error={errors.stock}
          required
        />
        
        <Input
          label="Category"
          type="text"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          placeholder="e.g., Groceries"
          error={errors.category}
          required
        />
      </div>
      
      <div className="flex space-x-3 mt-4">
        <Button onClick={handleSubmit} variant="success" icon={Save}>
          Save Item
        </Button>
        
        <Button onClick={onCancel} variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddItemForm;