import React, { useState } from 'react';
import SearchBar from '../../components/common/SearchBar';

const ReceiptList = ({ receipts = [], onSelectReceipt }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 🔐 SAFETY CHECK
  const safeReceipts = Array.isArray(receipts) ? receipts : [];

  // ✅ MOVE FUNCTIONS ABOVE FILTER
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB').replaceAll('/', '-');
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // ✅ FIXED SEARCH LOGIC
  const filteredReceipts = safeReceipts.filter((receipt) => {
    const term = searchTerm.toLowerCase();

    const billMatch =
      receipt?.billNumber?.toLowerCase().includes(term);

    const dateMatch =
      receipt.createdAt &&
      formatDate(receipt.createdAt).toLowerCase().includes(term);

    return billMatch || dateMatch;
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        All Receipts
      </h2>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by bill number or date..."
        />
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-linear-to-r from-sky-600 to-sky-600 text-white">
              <tr>
                <th className="px-6 py-4">Bill No</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReceipts.map((receipt) => (
                <tr key={receipt._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold">
                    {receipt.billNumber}
                  </td>

                  <td className="px-6 py-4">
                    {receipt.createdAt
                      ? formatDate(receipt.createdAt)
                      : '-'}
                  </td>

                  <td className="px-6 py-4">
                    {receipt.createdAt
                      ? formatTime(receipt.createdAt)
                      : '-'}
                  </td>

                  <td className="px-6 py-4">
                    {receipt.items?.length || 0} items
                  </td>

                  <td className="px-6 py-4">
                    {receipt.paymentMethod}
                  </td>

                  <td className="px-6 py-4 font-bold text-green-600">
                    ₹{receipt.total ??
                      receipt.items.reduce(
                        (sum, i) => sum + i.price * i.quantity,
                        0
                      )}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => onSelectReceipt(receipt)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-3xl cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredReceipts.length === 0 && (
            <p className="text-center py-8 text-gray-500">
              No receipts found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReceiptList;
  