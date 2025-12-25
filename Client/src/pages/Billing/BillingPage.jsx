// src/pages/Billing/BillingPage.jsx

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createBill } from '../../services/billService';
import { getItems } from '../../services/itemService';
import ItemSelection from './ItemSelection';
import BillSummary from './BillSummary';

const BillingPage = ({ items, setItems, setReceipts }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [loading, setLoading] = useState(false);

  // ✅ Customer Email (replaced WhatsApp)
  const [customerEmail, setCustomerEmail] = useState('');

  const addItemToBill = (item) => {
    const existingItem = selectedItems.find(
      (i) => i._id === item._id
    );

    if (existingItem) {
      setSelectedItems((prev) =>
        prev.map((i) =>
          i._id === item._id
            ? {
                ...i,
                qty: i.qty + 1,
                total: (i.qty + 1) * i.price,
              }
            : i
        )
      );
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { ...item, qty: 1, total: item.price },
      ]);
    }
  };

  const updateQuantity = (_id, qty) => {
    const quantity = parseInt(qty, 10);

    if (quantity <= 0) {
      setSelectedItems((prev) =>
        prev.filter((i) => i._id !== _id)
      );
    } else {
      setSelectedItems((prev) =>
        prev.map((i) =>
          i._id === _id
            ? {
                ...i,
                qty: quantity,
                total: quantity * i.price,
              }
            : i
        )
      );
    }
  };

  const removeItem = (_id) => {
    setSelectedItems((prev) =>
      prev.filter((i) => i._id !== _id)
    );
  };

  const grandTotal = selectedItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const generateBill = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please add items to the bill');
      return;
    }

    try {
      setLoading(true);

      const billData = {
        items: selectedItems.map((item) => ({
          itemId: item._id,
          quantity: item.qty,
          price: item.price,
          name: item.name,
          category: item.category,
        })),
        paymentMethod,
        customerEmail, // ✅ EMAIL sent to backend
      };

      const newBill = await createBill(billData);

      setReceipts((prev) => [newBill, ...prev]);

      const updatedItems = await getItems();
      setItems(updatedItems);

      toast.success('Bill generated successfully 🎉');

      // ✅ FIX: reset EMAIL (not phone)
      setSelectedItems([]);
      setCustomerEmail('');
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          'Failed to generate bill'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Bill
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ItemSelection
            items={items}
            onSelectItem={addItemToBill}
          />
        </div>

        <div>
          <BillSummary
            selectedItems={selectedItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            grandTotal={grandTotal}
            onGenerateBill={generateBill}
            loading={loading}
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
