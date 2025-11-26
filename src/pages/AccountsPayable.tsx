import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';

interface Payable {
  id: number;
  vendor: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Paid' | 'Overdue';
  category: string;
}

const AccountsPayable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const payables: Payable[] = [
    { id: 1, vendor: 'Office Supplies Co', invoiceNumber: 'INV-2024-001', amount: 2500, dueDate: '2024-01-20', status: 'Pending', category: 'Office Supplies' },
    { id: 2, vendor: 'Tech Solutions Inc', invoiceNumber: 'INV-2024-002', amount: 15000, dueDate: '2024-01-15', status: 'Overdue', category: 'Software' },
    { id: 3, vendor: 'Building Management', invoiceNumber: 'INV-2024-003', amount: 5000, dueDate: '2024-01-25', status: 'Pending', category: 'Rent' },
    { id: 4, vendor: 'Marketing Agency', invoiceNumber: 'INV-2024-004', amount: 8500, dueDate: '2024-01-10', status: 'Paid', category: 'Marketing' },
    { id: 5, vendor: 'Utility Company', invoiceNumber: 'INV-2024-005', amount: 1200, dueDate: '2024-01-30', status: 'Pending', category: 'Utilities' },
  ];

  const filteredPayables = payables.filter(payable =>
    payable.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payable.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPending = payables.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payables.filter(p => p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts Payable</h1>
          <p className="text-gray-600 mt-2">Manage vendor invoices and payments</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Pending</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">${totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Overdue</p>
          <p className="text-2xl font-bold text-red-600 mt-2">${totalOverdue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Invoices</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{payables.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search invoices..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayables.map((payable) => (
                <tr key={payable.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payable.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payable.invoiceNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payable.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${payable.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payable.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${payable.status === 'Paid' ? 'bg-green-100 text-green-800' : payable.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                      {payable.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Pay Now</button>
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

export default AccountsPayable;