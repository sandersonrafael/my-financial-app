const validateDate = (req, res, next) => {
  try {
    const { year, month, date } = req.body.fullDate;

    const compareDate = new Date(year, month, date);
    const checkFullDate = {
      year: compareDate.getFullYear(),
      month: compareDate.getMonth(),
      date: compareDate.getDate(),
    };
    const { year: checkYear, month: checkMonth, date: checkDate } = checkFullDate;

    const dateIsValid = year === checkYear && month === checkMonth && date === checkDate;
    if (!dateIsValid) return res.status(400).json({ message: 'Data informada é inválida' });

    next();
  } catch(error) {
    res.status(500).json({ message: 'Ocorreu um erro no servidor. Tenta novamente mais tarde!' });
  }
};

module.exports = validateDate;
