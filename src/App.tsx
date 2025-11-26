import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AccountsPayable from './pages/AccountsPayable';
import AccountsReceivable from './pages/AccountsReceivable';
import Expenses from './pages/Expenses';
import Payroll from './pages/Payroll';
import BudgetPlanning from './pages/BudgetPlanning';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts-payable" element={<AccountsPayable />} />
          <Route path="/accounts-receivable" element={<AccountsReceivable />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/budget-planning" element={<BudgetPlanning />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;