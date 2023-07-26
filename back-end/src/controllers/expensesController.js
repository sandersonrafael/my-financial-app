const ExpenseList = require('../models/ExpensesModel');

const list = async (req, res) => {
  try {
    const { id } = req.params;
    const expenseList = await ExpenseList.findOne({ relatedId: id });

    return expenseList
      ? res.status(200).json({ fullReport: expenseList.fullReport })
      : res.status(404).json({
        message: 'Não há dados cadastrados para o usuário informado.',
      });
  } catch(error) {
    res.status(500).json({ message: 'Ocorreu um erro no servidor. Tente novamente mais tarde!' });
  }
};

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
    res.status(200).json({ fullReport });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde!' });
  }
};

const deleteExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, month, date } = req.body.fullDate;
    const index = req.body.index;

    const { relatedId, fullReport } = await ExpenseList.findOne({ relatedId: id });

    if (!fullReport[year]) return res.status(400).json({
      message: 'Não existem registros para o ano informado.',
    });

    if (!fullReport[year][month]) return res.status(400).json({
      message: 'Não existem registros para o mês informado.',
    });

    if (!fullReport[year][month][date]) return res.status(400).json({
      message: 'Não existem registros para o dia informado.',
    });

    if (index !== null && index !== undefined && !fullReport[year][month][date][index])
      return res.status(400).json({
        message: 'Índice não existe nas despesas do dia informado.',
      });

    if (fullReport[year][month][date].length === 1 || index === null || index === undefined) {
      if (Object.keys(fullReport[year][month]).length === 1) {
        if (Object.keys(fullReport[year]).length === 1) {
          delete fullReport[year];
        } else {
          delete fullReport[year][month];
        }
      } else {
        delete fullReport[year][month][date];
      }
    } else {
      fullReport[year][month][date].splice(index, 1);
    }
    await ExpenseList.findOneAndUpdate({ relatedId }, { fullReport });
    return res.status(200).json({ fullReport });
  } catch(error) {
    res.status(500).json({ message: 'Ocorreu um erro no servidor. Tente novamente mais tarde!' });
  }
};

module.exports = {
  createOrUpdate,
  deleteExpenses,
  list,
};
