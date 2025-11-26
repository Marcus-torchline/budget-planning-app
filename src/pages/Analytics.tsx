import React from 'react';
import { TrendingUp, DollarSign, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';

const Analytics: React.FC = () => {
  const profitData = [
    { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
    { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
    { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
    { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
    { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
    { month: 'Jun', revenue: 67000, expenses: 40000, profit: 27000 },
  ];

  const revenueStreams = [
    { name: 'Product Sales', value: 145000, color: '#3b82f6' },
    { name: 'Services', value: 98000, color: '#8b5cf6' },
    { name: 'Subscriptions', value: 52000, color: '#10b981' },
    { name: 'Consulting', value: 33000, color: '#f59e0b' },
  ];

  const cashFlowData = [
    { month: 'Jan', inflow: 45000, outflow: 32000 },
    { month: 'Feb', inflow: 52000, outflow: 35000 },
    { month: 'Mar', inflow: 48000, outflow: 33000 },
    { month: 'Apr', inflow: 61000, outflow: 38000 },
    { month: 'May', inflow: 55000, outflow: 36000 },
    { month: 'Jun', inflow: 67000, outflow: 40000 },
  ];

  const totalRevenue = revenueStreams.reduce((sum, stream) => sum + stream.value, 0);
  const totalProfit = profitData.reduce((sum, month) => sum + month.profit, 0);
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Financial Analytics</h1>
        <p className="text-gray-600 mt-2">Comprehensive profit and revenue analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} trend="+15.3% from last period" trendUp={true} color="green" />
        <StatCard title="Total Profit" value={`$${totalProfit.toLocaleString()}`} icon={TrendingUp} trend="+22.8% from last period" trendUp={true} color="blue" />
        <StatCard title="Profit Margin" value={`${profitMargin}%`} icon={PieChartIcon} trend="+3.2% from last period" trendUp={true} color="purple" />
        <StatCard title="Growth Rate" value="18.5%" icon={BarChart3} trend="Steady growth" trendUp={true} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profit Trend Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="profit" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Streams</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={revenueStreams} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: $${(value / 1000).toFixed(0)}k`} outerRadius={100} fill="#8884d8" dataKey="value">
                {revenueStreams.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue vs Expenses vs Profit</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
            <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="Profit" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="inflow" fill="#10b981" name="Cash Inflow" />
            <Bar dataKey="outflow" fill="#ef4444" name="Cash Outflow" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Revenue Growth Rate</span>
              <span className="text-sm font-semibold text-green-600">+18.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Operating Margin</span>
              <span className="text-sm font-semibold text-blue-600">34.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Return on Investment</span>
              <span className="text-sm font-semibold text-purple-600">42.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Break-even Point</span>
              <span className="text-sm font-semibold text-orange-600">$28,500</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health Score</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Liquidity</span>
                <span className="text-sm font-semibold text-gray-900">92/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Profitability</span>
                <span className="text-sm font-semibold text-gray-900">88/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Efficiency</span>
                <span className="text-sm font-semibold text-gray-900">85/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Growth Potential</span>
                <span className="text-sm font-semibold text-gray-900">90/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;