// src/hooks/useReceipts.js
import { useState } from 'react';

/**
 * Custom hook for managing receipts
 * @param {Array} initialReceipts - Initial receipts array
 * @returns {object} Receipts and methods to manage them
 */
const useReceipts = (initialReceipts = []) => {
  const [receipts, setReceipts] = useState(initialReceipts);

  const addReceipt = (newReceipt) => {
    setReceipts([newReceipt, ...receipts]);
    return newReceipt;
  };

  const getReceipt = (id) => {
    return receipts.find(receipt => receipt.id === id);
  };

  const searchReceipts = (query) => {
    const lowerQuery = query.toLowerCase();
    return receipts.filter(receipt => 
      receipt.id.toLowerCase().includes(lowerQuery) ||
      receipt.date.includes(query)
    );
  };

  const getReceiptsByDate = (date) => {
    return receipts.filter(receipt => receipt.date === date);
  };

  const getTodayReceipts = () => {
    const today = new Date().toISOString().split('T')[0];
    return getReceiptsByDate(today);
  };

  const getTotalSales = () => {
    return receipts.reduce((sum, receipt) => sum + receipt.total, 0);
  };

  const getTodaySales = () => {
    const todayReceipts = getTodayReceipts();
    return todayReceipts.reduce((sum, receipt) => sum + receipt.total, 0);
  };

  return {
    receipts,
    addReceipt,
    getReceipt,
    searchReceipts,
    getReceiptsByDate,
    getTodayReceipts,
    getTotalSales,
    getTodaySales
  };
};

export default useReceipts;