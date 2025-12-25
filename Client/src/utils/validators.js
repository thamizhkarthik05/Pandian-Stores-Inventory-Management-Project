// src/utils/validators.js
// Utility functions for validation

/**
 * Validate item data
 * @param {object} item - Item object
 * @returns {object} Validation result with errors
 */
export const validateItem = (item) => {
  const errors = {};
  
  if (!item.name || item.name.trim() === '') {
    errors.name = 'Item name is required';
  }
  
  if (!item.price || parseFloat(item.price) <= 0) {
    errors.price = 'Price must be greater than 0';
  }
  
  if (item.stock === undefined || item.stock === null || parseInt(item.stock) < 0) {
    errors.stock = 'Stock cannot be negative';
  }
  
  if (!item.category || item.category.trim() === '') {
    errors.category = 'Category is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate price
 * @param {number} price - Price to validate
 * @returns {boolean} True if valid
 */
export const isValidPrice = (price) => {
  return !isNaN(price) && parseFloat(price) > 0;
};

/**
 * Validate stock
 * @param {number} stock - Stock to validate
 * @returns {boolean} True if valid
 */
export const isValidStock = (stock) => {
  return !isNaN(stock) && parseInt(stock) >= 0;
};

/**
 * Validate quantity
 * @param {number} quantity - Quantity to validate
 * @returns {boolean} True if valid
 */
export const isValidQuantity = (quantity) => {
  return !isNaN(quantity) && parseInt(quantity) > 0;
};

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate bill before generation
 * @param {Array} items - Array of bill items
 * @returns {object} Validation result
 */
export const validateBill = (items) => {
  if (!items || items.length === 0) {
    return {
      isValid: false,
      message: 'Please add items to the bill'
    };
  }
  
  const invalidItems = items.filter(item => item.qty <= 0 || item.price <= 0);
  
  if (invalidItems.length > 0) {
    return {
      isValid: false,
      message: 'All items must have valid quantity and price'
    };
  }
  
  return {
    isValid: true,
    message: 'Bill is valid'
  };
};