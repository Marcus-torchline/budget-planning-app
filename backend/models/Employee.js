import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  paymentFrequency: {
    type: String,
    required: true,
    enum: ['Weekly', 'Bi-weekly', 'Monthly'],
    default: 'Monthly'
  },
  lastPayment: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Active', 'On Leave', 'Terminated'],
    default: 'Active'
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  hireDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;