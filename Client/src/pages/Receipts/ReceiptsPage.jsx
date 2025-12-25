// src/pages/Receipts/ReceiptsPage.jsx
import { useEffect, useState } from 'react';
import { getBills } from '../../services/billService';
import ReceiptList from './ReceiptList';
import ReceiptView from './ReceiptView';

const ReceiptsPage = () => {
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const data = await getBills();
        setReceipts(data);
      } catch (error) {
        console.error('Failed to fetch bills', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading receipts...
      </div>
    );
  }

  return (
    <div className="p-6">
      {!selectedReceipt ? (
        <ReceiptList
          receipts={receipts}
          onSelectReceipt={setSelectedReceipt}
        />
      ) : (
        <ReceiptView
          receipt={selectedReceipt}
          onBack={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
};

export default ReceiptsPage;
