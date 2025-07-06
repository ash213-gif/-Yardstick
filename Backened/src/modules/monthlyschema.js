const mongoose = require('mongoose');

const MonthlytSchema = new mongoose.Schema({
    Amount: { type: Number, required: true, trim: true },
    Category: { type: String, enum: ['Food', 'Transport', 'Utilities', 'Groceries',  'Petrol',   'Entertainment'], required: true },
     month: {type: String,required: true, default: () => new Date().toISOString().slice(0, 7) 
  }
} ,{timestamps:true});

module.exports = mongoose.model('MonthyBudget', MonthlytSchema);

