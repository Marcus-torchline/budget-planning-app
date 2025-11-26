import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';

interface Receivable {
  id: number;
  client: string;
  invoiceNumber: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'Pending' | 'Paid' | 'Overdue';
  project: string;
}

const AccountsReceivable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const receivables: Receivable[] = [
    { id: 1, client: 'ABC Corporation', invoiceNumber: 'INV-R-2024-001', amount: 25000, issueDate: '2024-01-01', dueDate: '2024-01-31', status: 'Pending', project: 'Website Redesign' },
    { id: 2, client: 'XYZ Industries', invoiceNumber: 'INV-R-2024-002', amount: 18500, issueDate: '2024-01-05', dueDate: '2024-01-20', status: 'Paid', project: 'Mobile App Development' },
    { id: 3, client: 'Tech Startup Inc', invoiceNumber: 'INV-R-2024-003', amount: 32000, issueDate: '2023-12-15', dueDate: '2024-01-15', status: 'Overdue', project: 'Cloud Migration' },
    { id: 4, client: 'Global Enterprises', invoiceNumber: 'INV-R-2024-004', amount: 15000, issueDate: '2024-01-10', dueDate: '2024-02-10', status: 'Pending', project: 'Consulting Services' },
    { id: 5, client: 'Local Business LLC', invoiceNumber: 'INV-R-2024-005', amount: 8500, issueDate: '2024-01-12', dueDate: '2024-02-12', status: 'Pending', project: 'SEO Optimization' },
  ];

  const filteredReceivables = receivables.filter(receivable =>
    receivable.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receivable.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPending = receivables.filter(r => r.status === 'Pending').reduce((sum, r) => sum + r.amount, 0);
  const totalOverdue = receivables.filter(r => r.status === 'Overdue').reduce((sum, r) => sum + r.amount, 0);
  const totalPaid = receivables.filter(r => r.status === 'Paid').reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts Receivable</h1>
          <p className="text-gray-600 mt-2">Track client invoices and payments</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Pending Payments</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">${totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Overdue Payments</p>
          <p className="text-2xl font-bold text-red-600 mt-2">${totalOverdue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Paid This Month</p>
          <p className="text-2xl font-bold text-green-600 mt-2">${totalPaid.toLocaleString()}</p>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReceivables.map((receivable) => (
                <tr key={receivable.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receivable.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receivable.invoiceNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receivable.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${receivable.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receivable.issueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receivable.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${receivable.status === 'Paid' ? 'bg-green-100 text-green-800' : receivable.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                      {receivable.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Send Reminder</button>
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

export default AccountsReceivable;