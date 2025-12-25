// src/hooks/useItems.js
import { useState } from 'react';

/**
 * Custom hook for managing items
 * @param {Array} initialItems - Initial items array
 * @returns {object} Items and methods to manage them
 */
const useItems = (initialItems = []) => {
  const [items, setItems] = useState(initialItems);

  const addItem = (newItem) => {
    const item = {
      id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
      ...newItem
    };
    setItems([...items, item]);
    return item;
  };

  const updateItem = (id, updatedData) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getItem = (id) => {
    return items.find(item => item.id === id);
  };

  const searchItems = (query) => {
    const lowerQuery = query.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    );
  };

  const getLowStockItems = (threshold = 50) => {
    return items.filter(item => item.stock < threshold);
  };

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    getItem,
    searchItems,
    getLowStockItems
  };
};

export default useItems;