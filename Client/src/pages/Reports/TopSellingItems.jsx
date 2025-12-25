// src/pages/Reports/TopSellingItems.jsx
import React from 'react';

const TopSellingItems = ({ receipts }) => {
  const itemFrequency = {};

  receipts.forEach((receipt) => {
    if (!receipt.items) return;

    receipt.items.forEach((item) => {
      const name = item.name;
      const qty = item.quantity || 0; 

      if (!itemFrequency[name]) {
        itemFrequency[name] = 0;
      }

      itemFrequency[name] += qty;
    });
  });

  const topItems = Object.entries(itemFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Top Selling Items
      </h3>

      <div className="space-y-3">
        {topItems.map(([itemName, quantity], idx) => (
          <div
            key={itemName}
            className="flex items-center justify-between p-4 bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <p className="font-semibold text-gray-800">
                {itemName}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold text-indigo-600">
                {quantity} units
              </p>
              <p className="text-xs text-gray-500">sold</p>
            </div>
          </div>
        ))}
      </div>

      {topItems.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No sales data available
        </p>
      )}
    </div>
  );
};

export default TopSellingItems;
