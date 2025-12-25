// src/pages/Billing/BillSummary.jsx
import React from 'react';
import BillItem from './BillItem';

const BillSummary = ({
  selectedItems,
  onUpdateQuantity,
  onRemoveItem,
  paymentMethod,
  onPaymentMethodChange,
  grandTotal,
  onGenerateBill,
  customerEmail,
  setCustomerEmail,
}) => {

  // ✅ Email validation
  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Bill Summary
      </h3>

      {/* ITEMS LIST */}
      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {selectedItems.map(item => (
          <BillItem
            key={item._id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveItem}
          />
        ))}

        {selectedItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No items added yet
          </div>
        )}
      </div>

      {/* PAYMENT METHOD */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => onPaymentMethodChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
          <option>Net Banking</option>
        </select>
      </div>

      {/* 📧 CUSTOMER EMAIL */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Customer Email
        </label>
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="example@gmail.com"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
            customerEmail && !isEmailValid
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
        />
        {customerEmail && !isEmailValid && (
          <p className="text-xs text-red-500 mt-1">
            Please enter a valid email address
          </p>
        )}
      </div>

      {/* TOTAL & ACTION */}
      <div className="border-t-2 border-gray-200 pt-4 mt-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-gray-800">
            Grand Total:
          </span>
          <span className="text-2xl font-bold text-green-600">
            ₹{grandTotal}
          </span>
        </div>

        <button
          onClick={onGenerateBill}
          disabled={
            selectedItems.length === 0 || !isEmailValid
          }
          className={`w-full py-3 rounded-lg font-semibold transition-all shadow-md ${
            selectedItems.length === 0 || !isEmailValid
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-linear-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800'
          }`}
        >
          Generate Bill & Send Email
        </button>
      </div>
    </div>
  );
};

export default BillSummary;
