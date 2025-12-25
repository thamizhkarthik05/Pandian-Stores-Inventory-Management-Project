// src/hooks/useBilling.js
import { useState } from 'react';

/**
 * Custom hook for managing billing logic
 * @returns {object} Billing state and methods
 */
const useBilling = () => {
  const [billItems, setBillItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const addToBill = (item) => {
    const existingItem = billItems.find(i => i.id === item.id);
    
    if (existingItem) {
      updateQuantity(item.id, existingItem.qty + 1);
    } else {
      setBillItems([...billItems, { ...item, qty: 1, total: item.price }]);
    }
  };

  const removeFromBill = (id) => {
    setBillItems(billItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromBill(id);
    } else {
      setBillItems(billItems.map(item => 
        item.id === id 
          ? { ...item, qty: newQty, total: item.price * newQty }
          : item
      ));
    }
  };

  const calculateTotal = () => {
    return billItems.reduce((sum, item) => sum + item.total, 0);
  };

  const clearBill = () => {
    setBillItems([]);
    setPaymentMethod('Cash');
  };

  const generateBillData = (billNumber) => {
    return {
      id: billNumber,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: billItems.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        total: item.total
      })),
      total: calculateTotal(),
      paymentMethod
    };
  };

  return {
    billItems,
    paymentMethod,
    setPaymentMethod,
    addToBill,
    removeFromBill,
    updateQuantity,
    calculateTotal,
    clearBill,
    generateBillData
  };
};

export default useBilling;