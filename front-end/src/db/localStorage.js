const getFullReportStorage = () => {
  const fullReport = localStorage.getItem('userExpenses');
  let fullReportObj;
  if (fullReport) {
    fullReportObj = JSON.parse(fullReport);
  }
  return fullReportObj || {};
};

export const getDailyReportStorage = (fullDate) => {
  const { year, month, date } = fullDate;
  const fullReportObj = getFullReportStorage();
  return fullReportObj?.[year]?.[month]?.[date] || [];
};

export const setDailyReportStorage = (fullDate, newExpense, index) => {
  // aplicar lógica para editar aqui. Se receber um index, usar o index para editar...
  const { year, month, date } = fullDate;
  const fullReport = getFullReportStorage();
  fullReport[year] = fullReport[year] || {};
  fullReport[year][month] = fullReport[year][month] || {};
  fullReport[year][month][date] = fullReport[year][month][date] || [];

  if (index) {
    console.log('Fazer lógica de edição');
  } else {
    fullReport[year][month][date].push(newExpense);
    localStorage.setItem('userExpenses', JSON.stringify(fullReport));
  }
};

// fazer o de editar e o de deletar...
