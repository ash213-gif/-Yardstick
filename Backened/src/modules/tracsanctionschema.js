const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  amount: { type: Number,required: true,min: 0.01},
  date: {type: Date,required: true},
  description: { type: String,required: true, trim: true,maxlength: 200},
  category: {
    type: String,
    required: true,
    enum: [
      'Food & Dining',
      'Transportation',
      'Shopping',
      'Entertainment',
      'Bills & Utilities',
      'Healthcare',
      'Education',
      'Travel',
      'Groceries',
      'Housing',
      'Other'
    ]
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Transaction', transactionSchema)

