import React from 'react';

// Helper functions
const formatDate = (dateString) => {
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const RecentBills = ({ receipts, limit = 5 }) => {
  if (!receipts || receipts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Recent Bills
        </h3>
        <p className="text-center text-gray-500 py-6">
          No bills generated yet
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Recent Bills
      </h3>

      <div className="space-y-3">
        {receipts.slice(0, limit).map((bill) => (
          <div
            key={bill._id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {/* LEFT SIDE */}
            <div>
              <p className="font-semibold text-yellow-600">
                {bill.billNumber}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(bill.createdAt)} • {formatTime(bill.createdAt)}
              </p>
            </div>

            {/* RIGHT SIDE */}
            <p className="font-bold text-green-600">
              ₹{bill.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBills;
