// src/components/layout/Layout.jsx
// Main layout wrapper combining Sidebar and Header

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

/**
 * Layout Component - Main app layout structure
 * @param {object} props - Component props
 * @param {string} props.activeTab - Currently active tab
 * @param {function} props.setActiveTab - Function to change active tab
 * @param {React.ReactNode} props.children - Page content
 */
const Layout = ({ activeTab, setActiveTab, children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;