import React, { useState } from 'react';
import { Plus, Search, Download } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
  paymentFrequency: string;
  lastPayment: string;
  status: 'Active' | 'On Leave' | 'Terminated';
}

const Payroll: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const employees: Employee[] = [
    { id: 1, name: 'John Smith', position: 'Senior Developer', department: 'Engineering', salary: 8500, paymentFrequency: 'Monthly', lastPayment: '2024-01-01', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', position: 'Marketing Manager', department: 'Marketing', salary: 7200, paymentFrequency: 'Monthly', lastPayment: '2024-01-01', status: 'Active' },
    { id: 3, name: 'Michael Brown', position: 'Sales Representative', department: 'Sales', salary: 5500, paymentFrequency: 'Bi-weekly', lastPayment: '2024-01-15', status: 'Active' },
    { id: 4, name: 'Emily Davis', position: 'HR Specialist', department: 'Human Resources', salary: 6000, paymentFrequency: 'Monthly', lastPayment: '2024-01-01', status: 'On Leave' },
    { id: 5, name: 'David Wilson', position: 'Accountant', department: 'Finance', salary: 6800, paymentFrequency: 'Monthly', lastPayment: '2024-01-01', status: 'Active' },
    { id: 6, name: 'Lisa Anderson', position: 'Designer', department: 'Creative', salary: 5800, paymentFrequency: 'Monthly', lastPayment: '2024-01-01', status: 'Active' },
  ];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayroll = employees.filter(e => e.status === 'Active').reduce((sum, e) => sum + e.salary, 0);
  const activeEmployees = employees.filter(e => e.status === 'Active').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Payroll</h1>
          <p className="text-gray-600 mt-2">Manage employee salaries and payments</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Monthly Payroll</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">${totalPayroll.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Active Employees</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{activeEmployees}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Average Salary</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">${Math.round(totalPayroll / activeEmployees).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search employees..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Export Payroll
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${employee.salary.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.paymentFrequency}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.lastPayment}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : employee.status === 'On Leave' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Process Payment</button>
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

export default Payroll;