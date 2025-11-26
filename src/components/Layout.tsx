import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, CreditCard, TrendingUp, Users, Target, BarChart3, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Accounts Payable', href: '/accounts-payable', icon: FileText },
    { name: 'Accounts Receivable', href: '/accounts-receivable', icon: CreditCard },
    { name: 'Expenses', href: '/expenses', icon: TrendingUp },
    { name: 'Payroll', href: '/payroll', icon: Users },
    { name: 'Budget Planning', href: '/budget-planning', icon: Target },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)' }}>
      <div className="flex h-screen overflow-hidden">
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-50 to-gray-100 bg-opacity-30 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-300">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">FinanceHub</h1>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <nav className="px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href} onClick={() => setSidebarOpen(false)} className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-200 hover:bg-opacity-50'}`}>
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-gradient-to-r from-gray-50 to-gray-100 bg-opacity-30 backdrop-blur-md shadow-lg border-b border-gray-300">
            <div className="flex items-center justify-between h-16 px-6">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Welcome back!</div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;