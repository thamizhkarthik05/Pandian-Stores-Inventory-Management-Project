// src/pages/Dashboard/Dashboard.jsx
// Main dashboard page showing overview statistics

// Pushed by Kaarthik 23MIS0050

import React from 'react';
import { Package, FileText, BarChart3 } from 'lucide-react';
import SummaryCard from '../../components/dashboard/Summary';
import RecentBills from '../../components/dashboard/RecentBills';
import LowStockAlert from '../../components/dashboard/LowStockAlert';

/**
 * Dashboard Page Component
 * @param {object} props - Component props
 * @param {Array} props.items - Array of items
 * @param {Array} props.receipts - Array of receipts
 */

const isToday = (date) => {
  const today = new Date();
  const d = new Date(date);

  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};



 
const Dashboard = ({ items, receipts }) => {
  const totalItems = items.length;

  const todayBills = receipts.filter((r) =>
  r.createdAt && isToday(r.createdAt)
);

const todaySales = todayBills.reduce(
  (sum, r) => sum + (r.total || 0),
  0
);

const monthlySales = receipts.reduce(
  (sum, r) => sum + (r.total || 0),
  0
);


  const LOW_STOCK_THRESHOLD = 5;

  const lowStockItems = items.filter(
    (item) => item.stock < LOW_STOCK_THRESHOLD
  ).length;
    const todayBillsCount = todayBills.length;


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard 
          title="Total Items" 
          value={totalItems} 
          icon={Package} 
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          subtitle="In inventory"
        />
        
        <SummaryCard 
          title="Today's Sales" 
          value={`₹${todaySales}`} 
          icon={FileText} 
          color="bg-gradient-to-br from-green-500 to-green-600"
          subtitle={`${todayBillsCount} bills today`}
        />
        
        <SummaryCard 
          title="Monthly Sales" 
          value={`₹${monthlySales}`} 
          icon={BarChart3} 
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          subtitle={`${receipts.length} total bills`}
        />
        
        <SummaryCard 
          title="Low Stock Alerts" 
          value={lowStockItems} 
          icon={Package} 
          color="bg-gradient-to-br from-red-500 to-red-600"
          subtitle="Items below 50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBills receipts={receipts} limit={5} />
        <LowStockAlert items={items} threshold={LOW_STOCK_THRESHOLD} />
      </div>
    </div>
  );
};

export default Dashboard;
