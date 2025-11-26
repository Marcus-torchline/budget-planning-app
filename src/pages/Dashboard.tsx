import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Users, FileText, CreditCard } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';

const Dashboard: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 35000 },
    { month: 'Mar', revenue: 48000, expenses: 33000 },
    { month: 'Apr', revenue: 61000, expenses: 38000 },
    { month: 'May', revenue: 55000, expenses: 36000 },
    { month: 'Jun', revenue: 67000, expenses: 40000 },
  ];

  const expenseCategories = [
    { name: 'Payroll', value: 45000, color: '#3b82f6' },
    { name: 'Operations', value: 28000, color: '#8b5cf6' },
    { name: 'Marketing', value: 15000, color: '#10b981' },
    { name: 'Utilities', value: 8000, color: '#f59e0b' },
    { name: 'Other', value: 12000, color: '#ef4444' },
  ];

  const recentTransactions = [
    { id: 1, type: 'Income', description: 'Client Payment - ABC Corp', amount: 15000, date: '2024-01-15' },
    { id: 2, type: 'Expense', description: 'Office Rent', amount: -5000, date: '2024-01-14' },
    { id: 3, type: 'Income', description: 'Project Milestone - XYZ Ltd', amount: 8500, date: '2024-01-13' },
    { id: 4, type: 'Expense', description: 'Employee Salaries', amount: -25000, date: '2024-01-12' },
    { id: 5, type: 'Expense', description: 'Software Subscriptions', amount: -2500, date: '2024-01-11' },
  ];

  const getModalContent = (stat: string) => {
    switch(stat) {
      case 'revenue':
        return (
          <div className="space-y-4">
            <p className="text-gray-700">Total revenue for the current period is $328,000, showing a 12.5% increase from last month.</p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Revenue Breakdown:</h3>
              <ul className="space-y-2 text-green-700">
                <li>Product Sales: $145,000</li>
                <li>Services: $98,000</li>
                <li>Subscriptions: $52,000</li>
                <li>Consulting: $33,000</li>
              </ul>
            </div>
          </div>
        );
      case 'expenses':
        return (
          <div className="space-y-4">
            <p className="text-gray-700">Total expenses for the current period are $214,000, with a 5.2% increase from last month.</p>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Expense Categories:</h3>
              <ul className="space-y-2 text-red-700">
                <li>Payroll: $45,000</li>
                <li>Operations: $28,000</li>
                <li>Marketing: $15,000</li>
                <li>Utilities: $8,000</li>
                <li>Other: $12,000</li>
              </ul>
            </div>
          </div>
        );
      case 'profit':
        return (
          <div className="space-y-4">
            <p className="text-gray-700">Net profit stands at $114,000, representing an 18.3% increase from the previous month.</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Profit Metrics:</h3>
              <ul className="space-y-2 text-blue-700">
                <li>Gross Profit Margin: 34.8%</li>
                <li>Operating Margin: 28.5%</li>
                <li>Net Profit Margin: 25.2%</li>
                <li>ROI: 42.3%</li>
              </ul>
            </div>
          </div>
        );
      case 'payable':
        return (
          <div className="space-y-4">
            <p className="text-gray-700">Current accounts payable total $45,200 across 5 vendor invoices.</p>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">Payable Status:</h3>
              <ul className="space-y-2 text-orange-700">
                <li>Pending: $32,700 (3 invoices)</li>
                <li>Overdue: $12,500 (2 invoices)</li>
                <li>Due This Week: $18,200</li>
              </ul>
            </div>
          </div>
        );
      case 'receivable':
        return (
          <div className="space-y-4">
            <p className="text-gray-700">Outstanding accounts receivable amount to $67,800 from client invoices.</p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Receivable Status:</h3>
              <ul className="space-y-2 text-purple-700">
                <li>Pending: $48,300 (4 invoices)</li>
                <li>Overdue: $19,500 (1 invoice)</li>
                <li>Expected This Week: $25,000</li>
              </ul>
            </div>
          </div>
        );
      case 'employees':
        return (
          <div className="space-y-4">
            <p className="text-gray-700">Currently managing 24 active employees across all departments.</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Employee Distribution:</h3>
              <ul className="space-y-2 text-blue-700">
                <li>Engineering: 8 employees</li>
                <li>Sales: 6 employees</li>
                <li>Marketing: 4 employees</li>
                <li>Operations: 4 employees</li>
                <li>HR & Finance: 2 employees</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your financial performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div onClick={() => setSelectedStat('revenue')} className="cursor-pointer">
          <StatCard title="Total Revenue" value="$328,000" icon={DollarSign} trend="+12.5% from last month" trendUp={true} color="green" />
        </div>
        <div onClick={() => setSelectedStat('expenses')} className="cursor-pointer">
          <StatCard title="Total Expenses" value="$214,000" icon={TrendingDown} trend="+5.2% from last month" trendUp={false} color="red" />
        </div>
        <div onClick={() => setSelectedStat('profit')} className="cursor-pointer">
          <StatCard title="Net Profit" value="$114,000" icon={TrendingUp} trend="+18.3% from last month" trendUp={true} color="blue" />
        </div>
        <div onClick={() => setSelectedStat('payable')} className="cursor-pointer">
          <StatCard title="Accounts Payable" value="$45,200" icon={FileText} color="orange" />
        </div>
        <div onClick={() => setSelectedStat('receivable')} className="cursor-pointer">
          <StatCard title="Accounts Receivable" value="$67,800" icon={CreditCard} color="purple" />
        </div>
        <div onClick={() => setSelectedStat('employees')} className="cursor-pointer">
          <StatCard title="Active Employees" value="24" icon={Users} color="blue" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 bg-opacity-30 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-gray-300">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 bg-opacity-30 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-gray-300">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={expenseCategories} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 bg-opacity-30 backdrop-blur-sm rounded-lg shadow-sm border border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200 bg-opacity-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-gray-300">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${transaction.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(transaction.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={selectedStat !== null} onClose={() => setSelectedStat(null)} title={selectedStat ? selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1) + ' Details' : ''}>
        {selectedStat && getModalContent(selectedStat)}
      </Modal>
    </div>
  );
};

export default Dashboard;