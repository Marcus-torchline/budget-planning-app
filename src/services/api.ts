import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const payablesAPI = {
  getAll: () => api.get('/payables'),
  getById: (id: string) => api.get(`/payables/${id}`),
  create: (data: any) => api.post('/payables', data),
  update: (id: string, data: any) => api.put(`/payables/${id}`, data),
  pay: (id: string) => api.patch(`/payables/${id}/pay`),
  delete: (id: string) => api.delete(`/payables/${id}`),
};

export const receivablesAPI = {
  getAll: () => api.get('/receivables'),
  getById: (id: string) => api.get(`/receivables/${id}`),
  create: (data: any) => api.post('/receivables', data),
  update: (id: string, data: any) => api.put(`/receivables/${id}`, data),
  receive: (id: string) => api.patch(`/receivables/${id}/receive`),
  delete: (id: string) => api.delete(`/receivables/${id}`),
};

export const expensesAPI = {
  getAll: () => api.get('/expenses'),
  getById: (id: string) => api.get(`/expenses/${id}`),
  getByCategory: (category: string) => api.get(`/expenses/category/${category}`),
  create: (data: any) => api.post('/expenses', data),
  update: (id: string, data: any) => api.put(`/expenses/${id}`, data),
  delete: (id: string) => api.delete(`/expenses/${id}`),
};

export const employeesAPI = {
  getAll: () => api.get('/employees'),
  getActive: () => api.get('/employees/active'),
  getById: (id: string) => api.get(`/employees/${id}`),
  create: (data: any) => api.post('/employees', data),
  update: (id: string, data: any) => api.put(`/employees/${id}`, data),
  processPayment: (id: string) => api.patch(`/employees/${id}/pay`),
  delete: (id: string) => api.delete(`/employees/${id}`),
};

export const budgetsAPI = {
  getAll: () => api.get('/budgets'),
  getCurrent: () => api.get('/budgets/current'),
  getById: (id: string) => api.get(`/budgets/${id}`),
  create: (data: any) => api.post('/budgets', data),
  update: (id: string, data: any) => api.put(`/budgets/${id}`, data),
  delete: (id: string) => api.delete(`/budgets/${id}`),
};

export const transactionsAPI = {
  getAll: () => api.get('/transactions'),
  getRecent: (limit?: number) => api.get('/transactions/recent', { params: { limit } }),
  getById: (id: string) => api.get(`/transactions/${id}`),
  create: (data: any) => api.post('/transactions', data),
  delete: (id: string) => api.delete(`/transactions/${id}`),
};

export default api;