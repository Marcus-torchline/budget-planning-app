import mongoose from 'mongoose';

const receivableSchema = new mongoose.Schema({
  client: {
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
  issueDate: {
    type: Date,
    required: true
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
  project: {
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

receivableSchema.pre('save', function(next) {
  if (this.status === 'Pending' && this.dueDate < new Date()) {
    this.status = 'Overdue';
  }
  next();
});

const Receivable = mongoose.model('Receivable', receivableSchema);

export default Receivable;