const mongoose = require('mongoose');

const expenseList = new mongoose.Schema({
  relatedId: { type: String, required: true },
  fullReport: { type: Object, of: {
    years: { type: Object, of: {
      months: { type: Object, of: {
        dates: [{
          title: String,
          category: String,
          value: Number,
          expense: Boolean,
        }],
      } },
    } },
  } },
});

const ExpenseList = mongoose.model('ExpenseList', expenseList);

module.exports = ExpenseList;
