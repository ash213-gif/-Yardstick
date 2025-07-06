const mongoose=require('mongoose')

const budgetSchema = new mongoose.Schema({
  category: { type: String,required: true,unique: true,
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
  },
  amount: {  type: Number,required: true, min: 0.01},
  month: {type: String, required: true,  default: () => new Date().toISOString().slice(0, 7) }
}, {timestamps: true});

module.exports = mongoose.model('Budget', budgetSchema);