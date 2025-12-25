// src/utils/calculations.js
// Utility functions for calculations

/**
 * Calculate total for bill items
 * @param {Array} items - Array of bill items with qty and price
 * @returns {number} Total amount
 */
export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.qty), 0);
};

/**
 * Calculate grand total with tax
 * @param {number} subtotal - Subtotal amount
 * @param {number} taxRate - Tax rate in percentage (default 0)
 * @returns {object} Object with subtotal, tax, and total
 */
export const calculateGrandTotal = (subtotal, taxRate = 0) => {
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;
  
  return { 
    subtotal: parseFloat(subtotal.toFixed(2)), 
    tax: parseFloat(tax.toFixed(2)), 
    total: parseFloat(total.toFixed(2))
  };
};

/**
 * Apply discount to amount
 * @param {number} amount - Original amount
 * @param {number} discountPercent - Discount percentage
 * @returns {number} Discounted amount
 */
export const applyDiscount = (amount, discountPercent) => {
  const discountAmount = (amount * discountPercent) / 100;
  return parseFloat((amount - discountAmount).toFixed(2));
};

/**
 * Calculate discount amount
 * @param {number} amount - Original amount
 * @param {number} discountPercent - Discount percentage
 * @returns {number} Discount amount
 */
export const calculateDiscount = (amount, discountPercent) => {
  return parseFloat(((amount * discountPercent) / 100).toFixed(2));
};

/**
 * Calculate item total
 * @param {number} price - Item price
 * @param {number} quantity - Item quantity
 * @returns {number} Total for the item
 */
export const calculateItemTotal = (price, quantity) => {
  return parseFloat((price * quantity).toFixed(2));
};

/**
 * Calculate average
 * @param {Array} numbers - Array of numbers
 * @returns {number} Average value
 */
export const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return parseFloat((sum / numbers.length).toFixed(2));
};