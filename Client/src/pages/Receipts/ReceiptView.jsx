// src/pages/Receipts/ReceiptView.jsx


import React from 'react';
import { Printer } from 'lucide-react';
import '../../styles/print.css';

const ReceiptView = ({ receipt, onBack }) => {
  const printReceipt = () => {
    window.print();
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center print:hidden">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
        >
          ← Back to List
        </button>
        <button
          onClick={printReceipt}
          className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors c"
        >
          <Printer size={20} />
          <span>Print Receipt</span>
        </button>
      </div>

      <div
        id="print-receipt"
        className="receipt-container bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-bold text-[#d2a10f] mb-1" 
            style={{ fontFamily: 'Kavivanar, cursive' }}
          >
            பாண்டியன் ஸ்டோர்ஸ்
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Retail Shop Management</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>123 Main Street, City - 123456</p>
            <p className="font-medium text-gray-600">Phone: +91 98765 43210</p>
          </div>
        </div>

        {/* Bill Info Section */}
        <div className="flex justify-between items-end mb-8 pb-4 border-b border-dashed border-gray-300">
          <div>
            <p className="text-[10px] uppercase text-gray-400 font-bold leading-none mb-1">Invoice Number</p>
            <p className="font-mono text-lg font-bold text-gray-800">#{receipt.billNumber}</p>
          </div>

        <div className="text-right">
          <p className="text-[10px] uppercase text-gray-400 font-bold leading-none mb-1">Date & Time</p>
          {/* Format Date: e.g., 23 Dec 2025 */}
          <p className="text-sm font-medium text-gray-700">
            {new Date(receipt.createdAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </p>
          {/* Format Time: e.g., 07:00 AM */}
          <p className="text-xs text-gray-500">
            {new Date(receipt.createdAt).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
        </div>
        </div>

        {/* Table Section */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="text-left py-3 text-xs uppercase font-bold text-gray-600">Item Description</th>
              <th className="text-center py-3 text-xs uppercase font-bold text-gray-600">Qty</th>
              <th className="text-right py-3 text-xs uppercase font-bold text-gray-600">Price</th>
              <th className="text-right py-3 text-xs uppercase font-bold text-gray-600">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {receipt.items.map((item, idx) => (
              <tr key={idx} className="group">
                <td className="py-4 text-sm font-medium text-gray-800">{item.name}</td>
                <td className="py-4 text-center text-sm text-gray-600">{item.quantity}</td>
                <td className="py-4 text-right text-sm text-gray-600">₹{item.price.toLocaleString()}</td>
                <td className="py-4 text-right text-sm font-bold text-gray-900">₹{item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">Payment Method</span>
            <span className="text-sm font-bold bg-gray-200 px-2 py-1 rounded text-gray-700 uppercase">
              {receipt.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="text-lg font-bold text-gray-800">Grand Total</span>
            <span className="text-2xl font-black text-emerald-600">
              ₹{(receipt.total ?? receipt.items.reduce((sum, i) => sum + i.total, 0)).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center">
          <div className="inline-block px-6 py-2 border-y border-gray-200 mb-4">
            <p className="text-sm font-medium text-gray-600 italic">Thank you for shopping with us!</p>
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Visit again soon</p>
        </div>
      </div>


    </div>
  );
};

export default ReceiptView;