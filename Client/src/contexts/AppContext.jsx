// src/contexts/AppContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { initialItems } from '../data/items';
import { initialReceipts } from '../data/receipts';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [items, setItems] = useState(initialItems);
  const [receipts, setReceipts] = useState(initialReceipts);
  const [activeTab, setActiveTab] = useState('dashboard');

  const value = {
    items,
    setItems,
    receipts,
    setReceipts,
    activeTab,
    setActiveTab
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;