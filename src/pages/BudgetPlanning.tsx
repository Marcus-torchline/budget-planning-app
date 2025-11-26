import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BudgetCategory {
  id: number;
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  percentage: number;
}

const BudgetPlanning: React.FC = () => {
  const budgetCategories: BudgetCategory[] = [
    { id: 1, category: 'Payroll', budgeted: 50000, actual: 48500, variance: 1500, percentage: 97 },
    { id: 2, category: 'Operations', budgeted: 15000, actual: 16200, variance: -1200, percentage: 108 },
    { id: 3, category: 'Marketing', budgeted: 20000, actual: 18500, variance: 1500, percentage: 92.5 },
    { id: 4, category: 'Technology', budgeted: 12000, actual: 11800, variance: 200, percentage: 98.3 },
    { id: 5, category: 'Utilities', budgeted: 5000, actual: 4800, variance: 200, percentage: 96 },
    { id: 6, category: 'Travel', budgeted: 8000, actual: 9200, variance: -1200, percentage: 115 },
  ];

  const chartData = budgetCategories.map(cat => ({
    category: cat.category,
    Budgeted: cat.budgeted,
    Actual: cat.actual,
  }));

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalActual = budgetCategories.reduce((sum, cat) => sum + cat.actual, 0);
  const totalVariance = totalBudgeted - totalActual;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budget Planning</h1>
          <p className="text-gray-600 mt-2">Set and track budget targets across categories</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Budget Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Budgeted</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">${totalBudgeted.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Actual</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">${totalActual.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Variance</p>
          <div className="flex items-center mt-2">
            <p className={`text-2xl font-bold ${totalVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(totalVariance).toLocaleString()}
            </p>
            {totalVariance >= 0 ? (
              <TrendingUp className="w-6 h-6 text-green-600 ml-2" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-600 ml-2" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget vs Actual Comparison</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budgeted" fill="#3b82f6" name="Budgeted" />
            <Bar dataKey="Actual" fill="#10b981" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Budget Categories</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budgeted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgetCategories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${category.budgeted.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${category.actual.toLocaleString()}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${category.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {category.variance >= 0 ? '+' : ''}{category.variance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.percentage}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${category.percentage <= 100 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${Math.min(category.percentage, 100)}%` }}></div>
                    </div>
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

export default BudgetPlanning;