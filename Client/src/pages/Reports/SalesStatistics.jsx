// src/pages/Reports/SalesStatistics.jsx
import React from 'react';

const SalesStatistics = ({ receipts }) => {
  const totalRevenue = receipts.reduce((sum, r) => sum + r.total, 0);
  const averageBill = receipts.length > 0 
    ? (totalRevenue / receipts.length).toFixed(2) 
    : 0;
  const totalTransactions = receipts.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
        <p className="text-3xl font-bold text-green-600">₹{totalRevenue}</p>
        <p className="text-xs text-gray-400 mt-2">From {receipts.length} bills</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-sm text-gray-500 mb-1">Average Bill Value</p>
        <p className="text-3xl font-bold text-blue-600">₹{averageBill}</p>
        <p className="text-xs text-gray-400 mt-2">Per transaction</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
        <p className="text-3xl font-bold text-purple-600">{totalTransactions}</p>
        <p className="text-xs text-gray-400 mt-2">All time</p>
      </div>
    </div>
  );
};

export default SalesStatistics;