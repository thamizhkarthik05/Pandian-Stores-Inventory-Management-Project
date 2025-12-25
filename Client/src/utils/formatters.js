// src/utils/formatters.js
// Utility functions for formatting data

/**
 * Format number as Indian currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

/**
 * Format date to readable format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format time to 12-hour format
 * @param {string|Date} time - Time to format
 * @returns {string} Formatted time string
 */
export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Generate bill number with padding
 * @param {number} count - Bill count
 * @returns {string} Bill number like BILL001
 */
export const generateBillNumber = (count) => {
  return `BILL${String(count).padStart(3, '0')}`;
};

/**
 * Format date for input fields (YYYY-MM-DD)
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatDateForInput = (date) => {
  return date.toISOString().split('T')[0];
};

/**
 * Get current date in ISO format
 * @returns {string} Current date
 */
export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Get current time
 * @returns {string} Current time
 */
export const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};