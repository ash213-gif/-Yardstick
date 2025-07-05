const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    Amount: { type: Number, required: true, trim: true },
    Category: { type: String, enum: ['Food', 'Healthcare','Transport', 'Utilities', 'Groceries',  'Petrol',   'Entertainment'], required: true },
    Date: { type: Date, required: true, trim: true }
} , {timestamps:true});

module.exports = mongoose.model('Transaction', TransactionSchema);

