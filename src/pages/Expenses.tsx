import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  receipt: boolean;
}

const Expenses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const expenses: Expense[] = [
    { id: 1, description: 'Office Supplies', category: 'Operations', amount: 450, date: '2024-01-15', paymentMethod: 'Credit Card', receipt: true },
    { id: 2, description: 'Software Licenses', category: 'Technology', amount: 2500, date: '2024-01-14', paymentMethod: 'Bank Transfer', receipt: true },
    { id: 3, description: 'Client Lunch Meeting', category: 'Entertainment', amount: 180, date: '2024-01-13', paymentMethod: 'Cash', receipt: false },
    { id: 4, description: 'Internet Service', category: 'Utilities', amount: 120, date: '2024-01-12', paymentMethod: 'Auto-Pay', receipt: true },
    { id: 5, description: 'Marketing Campaign', category: 'Marketing', amount: 5000, date: '2024-01-11', paymentMethod: 'Credit Card', receipt: true },
    { id: 6, description: 'Office Cleaning', category: 'Operations', amount: 300, date: '2024-01-10', paymentMethod: 'Check', receipt: true },
    { id: 7, description: 'Employee Training', category: 'HR', amount: 1500, date: '2024-01-09', paymentMethod: 'Bank Transfer', receipt: true },
  ];

  const categoryData = [
    { category: 'Operations', amount: 750 },
    { category: 'Technology', amount: 2500 },
    { category: 'Marketing', amount: 5000 },
    { category: 'Utilities', amount: 120 },
    { category: 'HR', amount: 1500 },
    { category: 'Entertainment', amount: 180 },
  ];

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracking</h1>
          <p className="text-gray-600 mt-2">Monitor and categorize business expenses</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600 mt-2">${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">This Month</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{expenses.length} Transactions</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Average Expense</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">${Math.round(totalExpenses / expenses.length).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#ef4444" name="Amount ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search expenses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">${expense.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${expense.receipt ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {expense.receipt ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;