import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';


import SearchBar from '../../components/common/SearchBar';
import AddItemForm from './AddItemForm';
import ItemTable from './ItemTable';

import {
  createItem,
  updateItem as updateItemAPI,
  deleteItem as deleteItemAPI
} from '../../services/itemService';

const ItemsManagement = ({ items, setItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter items based on search
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ======================
  // CREATE ITEM
  // ======================
  const addItem = async (newItem) => {
    try {
      const savedItem = await createItem(newItem);
      setItems([savedItem, ...items]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    }
  };

  // ======================
  // UPDATE ITEM
  // ======================
  const updateItem = async (updatedItem) => {
    try {
      const savedItem = await updateItemAPI(updatedItem._id, updatedItem);
      setItems(items.map(item =>
        item._id === savedItem._id ? savedItem : item
      ));
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item');
    }
  };

  // ======================
  // DELETE ITEM
  // ======================
const deleteItem = (id) => {
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <p className="font-semibold text-gray-800">
          Are you sure you want to delete this item?
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await deleteItemAPI(id);
                setItems(items.filter(item => item._id !== id));
                toast.success('Item deleted successfully 🗑️');
              } catch (error) {
                console.error('Error deleting item:', error);
                toast.error('Failed to delete item');
              }
            }}
            className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Items Management
        </h2>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          <Plus size={20} />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <AddItemForm
          onSubmit={addItem}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search items by name or category..."
        />
      </div>

      {/* Items Table */}
      <ItemTable
        items={filteredItems}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
    </div>
  );
};

export default ItemsManagement;
