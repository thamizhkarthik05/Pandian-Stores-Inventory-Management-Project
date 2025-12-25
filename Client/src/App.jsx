// src/App.jsx
import { useEffect, useState } from 'react';
import { getItems } from './services/itemService';
import { getBills } from './services/billService';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import ItemsManagement from './pages/Items/ItemsManagement';
import BillingPage from './pages/Billing/BillingPage';
import ReceiptsPage from './pages/Receipts/ReceiptsPage';
import ReportsPage from './pages/Reports/ReportsPage';
import { Toaster } from 'react-hot-toast';


const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const [items, setItems] = useState([]);

    useEffect(() => {
      const fetchItems = async () => {
        const data = await getItems();
        setItems(data);
      };
      fetchItems();
    }, []);


  useEffect(() => {
    getBills().then(setReceipts);
  }, [])

  return (

    <>
    <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            marginTop: '80px', // pushes toast below header
          },
        }}
      />

    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header setIsMobileOpen={setIsMobileOpen} />

        <div className="flex-1 overflow-auto">
          {activeTab === 'dashboard' && <Dashboard items={items} receipts={receipts} />}
          {activeTab === 'items' && <ItemsManagement items={items} setItems={setItems} />}
          {activeTab === 'billing' && <BillingPage items={items} receipts={receipts} setItems={setItems} setReceipts={setReceipts} />}
          {activeTab === 'receipts' && <ReceiptsPage receipts={receipts} />}
          {activeTab === 'reports' && <ReportsPage items={items} receipts={receipts} />}
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
        }
      `}</style>
    </div>
    </>
  );
};

export default App;