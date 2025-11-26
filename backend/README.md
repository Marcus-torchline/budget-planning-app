# Budget & Bookkeeping Backend API

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string and other configurations.

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Payables
- GET `/api/payables` - Get all payables
- GET `/api/payables/:id` - Get payable by ID
- POST `/api/payables` - Create new payable
- PUT `/api/payables/:id` - Update payable
- PATCH `/api/payables/:id/pay` - Mark payable as paid
- DELETE `/api/payables/:id` - Delete payable

### Receivables
- GET `/api/receivables` - Get all receivables
- GET `/api/receivables/:id` - Get receivable by ID
- POST `/api/receivables` - Create new receivable
- PUT `/api/receivables/:id` - Update receivable
- PATCH `/api/receivables/:id/receive` - Mark receivable as paid
- DELETE `/api/receivables/:id` - Delete receivable

### Expenses
- GET `/api/expenses` - Get all expenses
- GET `/api/expenses/:id` - Get expense by ID
- GET `/api/expenses/category/:category` - Get expenses by category
- POST `/api/expenses` - Create new expense
- PUT `/api/expenses/:id` - Update expense
- DELETE `/api/expenses/:id` - Delete expense

### Employees
- GET `/api/employees` - Get all employees
- GET `/api/employees/active` - Get active employees
- GET `/api/employees/:id` - Get employee by ID
- POST `/api/employees` - Create new employee
- PUT `/api/employees/:id` - Update employee
- PATCH `/api/employees/:id/pay` - Process employee payment
- DELETE `/api/employees/:id` - Delete employee

### Budgets
- GET `/api/budgets` - Get all budgets
- GET `/api/budgets/current` - Get current budgets
- GET `/api/budgets/:id` - Get budget by ID
- POST `/api/budgets` - Create new budget
- PUT `/api/budgets/:id` - Update budget
- DELETE `/api/budgets/:id` - Delete budget

### Transactions
- GET `/api/transactions` - Get all transactions
- GET `/api/transactions/recent?limit=10` - Get recent transactions
- GET `/api/transactions/:id` - Get transaction by ID
- POST `/api/transactions` - Create new transaction
- DELETE `/api/transactions/:id` - Delete transaction

## Database Models

- **Payable**: Vendor invoices and payments
- **Receivable**: Client invoices and payments
- **Expense**: Business expenses tracking
- **Employee**: Employee information and payroll
- **Budget**: Budget planning and tracking
- **Transaction**: Financial transactions history