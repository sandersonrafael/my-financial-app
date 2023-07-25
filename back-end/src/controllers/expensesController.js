const ExpenseList = require('../models/ExpensesModel');

const createOrUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, month, date } = req.body.fullDate;
    const { newExpense, index } = req.body;

    const expenseList = await ExpenseList.findOne({ relatedId: id }) || {};
    let { relatedId, fullReport } = expenseList;

    relatedId = relatedId || id;
    fullReport = fullReport || {};
    fullReport[year] = fullReport[year] || {};
    fullReport[year][month] = fullReport[year][month] || {};
    fullReport[year][month][date] = fullReport[year][month][date] || [];

    if (index !== undefined) {
      if (fullReport[year][month][date].length <= index) {
        return res.status(400).json({ message: 'Índice informado não consta na lista.' });
      }
      fullReport[year][month][date][index] = newExpense;
    }
    else fullReport[year][month][date].push(newExpense);

    if (!Object.keys(expenseList)?.length) {
      const userExpenses = new ExpenseList({ relatedId, fullReport });
      await userExpenses.save();
    } else {
      await ExpenseList.findOneAndUpdate({ relatedId }, { fullReport });
    }
    res.status(200).json({ relatedId, fullReport });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde!' });
  }
};

module.exports = {
  createOrUpdate,
};
