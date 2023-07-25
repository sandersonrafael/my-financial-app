const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  // _id: false,
  title: { type: String, required: true },
  category: { type: String, required: true },
  value: { type: Number, required: true },
  expense: { type: Boolean, required: true },
});

const daySchema = new mongoose.Schema({
  // _id: false,
  expenses: [expenseSchema],
});

const monthSchema = new mongoose.Schema({
  // _id: false,
  days: { type: Map, of: daySchema },
});

const yearSchema = new mongoose.Schema({
  // _id: false,
  months: { type: Map, of: monthSchema },
});

const fullExpensesSchema = new mongoose.Schema({
  _id: false,
  relatedId: {
    type: String,
    required: true,
    unique: true,
  },
  years: { type: Map, of: yearSchema },
});

const ExpenseList = mongoose.model('UserExpenses', fullExpensesSchema);

module.exports = ExpenseList;
