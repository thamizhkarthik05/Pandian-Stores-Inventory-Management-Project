import React, { useState, useMemo } from 'react';
import SalesStatistics from './SalesStatistics';
import TopSellingItems from './TopSellingItems';

import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell, Sector,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#6366F1', '#22C55E', '#F59E0B', '#EF4444'];

/* ---------- ACTIVE SHAPE ---------- */
const renderActiveShape = ({
  cx, cy, innerRadius, outerRadius,
  startAngle, endAngle, fill
}) => (
  <g>
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
    <Sector
      cx={cx}
      cy={cy}
      startAngle={startAngle}
      endAngle={endAngle}
      innerRadius={outerRadius + 6}
      outerRadius={outerRadius + 10}
      fill={fill}
    />
  </g>
);

const ReportsPage = ({ receipts }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [payActiveIndex, setPayActiveIndex] = useState(-1);

  /* ---------- CATEGORY DATA (FIXED) ---------- */
  const categoryData = useMemo(() => {
    const map = {};
    receipts.forEach(r => {
      r.items.forEach(item => {
        if (!item.category) return;
        
        // FIX: Added .trim() to remove whitespace logic issues
        const trimmedCategory = item.category.trim();
        const name =
          trimmedCategory.charAt(0).toUpperCase() +
          trimmedCategory.slice(1).toLowerCase();
          
        map[name] = (map[name] || 0) + item.total;
      });
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [receipts]);

  /* ---------- RANDOM COLORS ---------- */
  const categoryColors = useMemo(() => {
    const used = new Set();
    return categoryData.map(() => {
      let hue;
      do {
        hue = Math.floor(Math.random() * 360);
      } while (used.has(hue));
      used.add(hue);
      return `hsl(${hue}, 70%, 55%)`;
    });
  }, [categoryData]);

  /* ---------- DAILY SALES ---------- */
  const dailyData = useMemo(() => {
    const map = {};
    receipts.forEach(r => {
      const date = new Date(r.createdAt).toLocaleDateString('en-GB');
      map[date] = (map[date] || 0) + r.total;
    });
    return Object.entries(map).map(([date, total]) => ({ date, total }));
  }, [receipts]);

  /* ---------- MONTHLY SALES ---------- */
  const monthlyData = useMemo(() => {
    const map = {};
    receipts.forEach(r => {
      const month = new Date(r.createdAt).toLocaleString('default', {
        month: 'short',
        year: 'numeric'
      });
      map[month] = (map[month] || 0) + r.total;
    });
    return Object.entries(map).map(([month, total]) => ({ month, total }));
  }, [receipts]);

  /* ---------- PAYMENT DATA ---------- */
  const paymentData = useMemo(() => {
    const map = {};
    receipts.forEach(r => {
      if (!r.paymentMethod) return;
      const method = r.paymentMethod.trim(); // Added trim here for consistency
      map[method] = (map[method] || 0) + r.total;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [receipts]);

  /* ---------- PIE LABEL ---------- */
  const renderPieLabel = ({ cx, cy, midAngle, outerRadius, name, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 28;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '13px', fill: '#374151' }}
      >
        <tspan fontWeight="bold">{name}</tspan>
        <tspan x={x} dy="1.2em" fill="#9CA3AF">
          {(percent * 100).toFixed(2)}%
        </tspan>
      </text>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reports & Analysis</h2>

      <SalesStatistics receipts={receipts} />
      <TopSellingItems receipts={receipts} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        {/* DAILY SALES */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Daily Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                dataKey="total"
                stroke="#6366F1"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY PIE */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Category Wise Sales</h3>
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={105}
                paddingAngle={2}
                dataKey="value"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, i) => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(-1)}
                label={renderPieLabel}
                animationBegin={0}
                animationDuration={900}
                animationEasing="ease-out"
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={categoryColors[i]} />
                ))}
              </Pie>

              <Tooltip key="category-tooltip" formatter={(v) => `₹${v.toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* MONTHLY BAR */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#A855F7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PAYMENT PIE */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={105}
                paddingAngle={2}
                dataKey="value"
                activeIndex={payActiveIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, i) => setPayActiveIndex(i)}
                onMouseLeave={() => setPayActiveIndex(-1)}
                label={renderPieLabel}
                animationBegin={150}
                animationDuration={900}
                animationEasing="ease-out"
              >
                {paymentData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip key="payment-tooltip" formatter={(v) => `₹${v.toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default ReportsPage;