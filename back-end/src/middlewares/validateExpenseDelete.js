const validateExpenseDelete = (req, res, next) => {
  try {
    if (!req.body.fullDate) return res.status(400).json({
      message: 'Necessário informar um objeto "fullDate" contendo year, month e date.',
    });

    const { year, month, date } = req.body.fullDate;
    if (
      year === undefined || typeof year !== 'number' ||
      month === undefined || typeof month !== 'number' ||
      date === undefined || typeof date !== 'number'
    ) return res.status(400).json({
      message: 'Necessário informar year, month e date como números válidos.',
    });

    const index = req.body.index;
    if (index !== undefined && index !== null && typeof index !== 'number')
      return res.status(400).json({
        message: 'Necessário informar um índice válido, do tipo number para editar a despesa.',
      });
  } catch(error) {
    return res.status(500).json({
      message: 'Ocorreu um erro no servidor. Tenta novamente mais tarde!',
    });
  }

  next();
};

module.exports = validateExpenseDelete;
