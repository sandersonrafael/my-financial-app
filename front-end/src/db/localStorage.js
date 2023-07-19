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
  const { year, month, date } = fullDate;
  const fullReport = getFullReportStorage();

  fullReport[year] = fullReport[year] || {};
  fullReport[year][month] = fullReport[year][month] || {};
  fullReport[year][month][date] = fullReport[year][month][date] || [];

  if (index !== undefined) {
    fullReport[year][month][date][index] = newExpense;
  } else {
    fullReport[year][month][date].push(newExpense);
  }
  localStorage.setItem('userExpenses', JSON.stringify(fullReport));
};

export const deleteDailyReportStorage = (fullDate, index) => {
  const { year, month, date } = fullDate;
  const fullReport = getFullReportStorage();

  if (fullReport[year][month][date].length === 1 || index === null) {
    if (Object.keys(fullReport[year][month]).length === 1) {
      if (Object.keys(fullReport[year]).length === 1) {
        return localStorage.removeItem('userExpenses');
      } else {
        delete fullReport[year][month];
      }
    } else {
      delete fullReport[year][month][date];
    }
  } else {
    fullReport[year][month][date].splice(index, 1);
  }
  localStorage.setItem('userExpenses', JSON.stringify(fullReport));
};
