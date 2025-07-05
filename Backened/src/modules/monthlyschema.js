const mongoose = require('mongoose');

const MonthlytSchema = new mongoose.Schema({
    Amount: { type: Number, required: true, trim: true },
    Category: { type: String, enum: ['Food', 'Transport', 'Utilities', 'Groceries',  'Petrol',   'Entertainment'], required: true },
    // Date: { type: Date, required: true, trim: true }
} ,{timestamps:true});

module.exports = mongoose.model('MonthyBudget', MonthlytSchema);

