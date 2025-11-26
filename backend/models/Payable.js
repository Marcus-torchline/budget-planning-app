import mongoose from 'mongoose';

const payableSchema = new mongoose.Schema({
  vendor: {
    type: String,
    required: true,
    trim: true
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Overdue'],
    default: 'Pending'
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  paidDate: {
    type: Date
  }
}, {
  timestamps: true
});

payableSchema.pre('save', function(next) {
  if (this.status === 'Pending' && this.dueDate < new Date()) {
    this.status = 'Overdue';
  }
  next();
});

const Payable = mongoose.model('Payable', payableSchema);

export default Payable;