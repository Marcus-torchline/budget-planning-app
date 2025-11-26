import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  budgeted: {
    type: Number,
    required: true,
    min: 0
  },
  actual: {
    type: Number,
    default: 0,
    min: 0
  },
  period: {
    type: String,
    required: true,
    enum: ['Monthly', 'Quarterly', 'Yearly'],
    default: 'Monthly'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

budgetSchema.virtual('variance').get(function() {
  return this.budgeted - this.actual;
});

budgetSchema.virtual('percentage').get(function() {
  return this.budgeted > 0 ? (this.actual / this.budgeted) * 100 : 0;
});

budgetSchema.set('toJSON', { virtuals: true });
budgetSchema.set('toObject', { virtuals: true });

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;