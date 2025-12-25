// src/data/receipts.js
// Initial dummy data for receipts/bills

export const initialReceipts = [
  { 
    id: 'BILL001', 
    date: '2024-12-14', 
    time: '10:30 AM',
    items: [
      { name: 'Rice (1kg)', qty: 2, price: 80, total: 160 },
      { name: 'Sugar (1kg)', qty: 1, price: 55, total: 55 },
    ],
    total: 215,
    paymentMethod: 'Cash'
  },
  { 
    id: 'BILL002', 
    date: '2024-12-14', 
    time: '11:15 AM',
    items: [
      { name: 'Cooking Oil (1L)', qty: 1, price: 180, total: 180 },
      { name: 'Tea Powder (250g)', qty: 2, price: 120, total: 240 },
    ],
    total: 420,
    paymentMethod: 'UPI'
  },
  { 
    id: 'BILL003', 
    date: '2024-12-13', 
    time: '03:45 PM',
    items: [
      { name: 'Milk (1L)', qty: 3, price: 60, total: 180 },
      { name: 'Bread', qty: 2, price: 40, total: 80 },
    ],
    total: 260,
    paymentMethod: 'Cash'
  },
  { 
    id: 'BILL004', 
    date: '2024-12-13', 
    time: '05:20 PM',
    items: [
      { name: 'Coffee (200g)', qty: 1, price: 250, total: 250 },
      { name: 'Butter (500g)', qty: 1, price: 220, total: 220 },
    ],
    total: 470,
    paymentMethod: 'Card'
  },
  { 
    id: 'BILL005', 
    date: '2024-12-12', 
    time: '09:15 AM',
    items: [
      { name: 'Eggs (12 pcs)', qty: 2, price: 84, total: 168 },
      { name: 'Wheat Flour (1kg)', qty: 3, price: 45, total: 135 },
    ],
    total: 303,
    paymentMethod: 'UPI'
  },
];