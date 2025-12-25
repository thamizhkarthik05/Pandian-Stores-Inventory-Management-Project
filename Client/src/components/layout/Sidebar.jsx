// src/components/layout/Sidebar.jsx
// Fixed sidebar navigation menu

import React from 'react';
import { Home, Package, FileText, Receipt, BarChart3, X } from 'lucide-react';

/**
 * Sidebar Component - Navigation menu
 * @param {object} props - Component props
 * @param {string} props.activeTab - Currently active tab/page
 * @param {function} props.setActiveTab - Function to change active tab
 * @param {boolean} props.isMobileOpen - Mobile menu open state
 * @param {function} props.setIsMobileOpen - Function to toggle mobile menu
 */
const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'items', label: 'Items Management', icon: Package },
    { id: 'billing', label: 'Billing', icon: FileText },
    { id: 'receipts', label: 'Receipts', icon: Receipt },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <div 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-linear-to-b  from-sky-600 to-sky-800 text-white transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 ">
          <div className="flex items-center justify-between mb-8 ">
            
            {/* TitleBar */}
            <div className="flex items-center"> 
                <img
                src="/pandian-stores.png" 
                alt="Pandian Stores"
                className="h-15 w-auto object-contain ml-7"
                />
            </div>

                <button 
                    onClick={() => setIsMobileOpen(false)}
                    className="lg:hidden hover:bg-indigo-700 p-1 rounded"
                >
                    <X size={24} />
                </button>
            </div>
          
          <nav className="space-y-2 ">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center cursor-pointer space-x-3 px-4 py-3 rounded-lg transition-all duration-200  ${
                    activeTab === item.id 
                      ? 'bg-white text-indigo-600 shadow-lg' 
                      : 'hover:bg-blue-900'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;