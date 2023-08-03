export default function getPeriodReport(report = {}) {
  const dailyReports = [];
  const monthlyReports = [];
  const yearlyReports = [];

  // daily
  for (const year in report) {
    for (const month in report[year]) {
      for (const date in report[year][month]) {
        const newResult = {};
        const dateExpense = report[year][month][date];
        const realMonth = Number(month) + 1;

        newResult[`${date<10?'0'+date:date}/${realMonth<10?'0'+realMonth:realMonth}/${year}`] = {
          entries: dateExpense.reduce((sum, item) => item.expense ? sum : sum + item.value, 0),
          exits: dateExpense.reduce((sum, item) => !item.expense ? sum : sum + item.value, 0),
          total: dateExpense.reduce(
            (sum, { expense, value }) => sum + (expense ? -value : value), 0,
          ),
        };
        dailyReports.push({ ...newResult });
      }
    }
  }

  // monthly
  for (const i in dailyReports) {
    const newResult = {};
    const fullDate = Object.keys(dailyReports[i])[0];
    const month = fullDate.slice(3);
    newResult[month] = { ...dailyReports[i][fullDate] };

    const monthExists = monthlyReports.length === 0 ? false : monthlyReports.reduce(
      (exists, obj) => exists || Object.keys(obj)[0] === month, false,
    );

    if (monthExists) {
      for (const i in monthlyReports) {
        if (monthlyReports[i][month]) {
          for (const key in monthlyReports[i][month]) {
            monthlyReports[i][month][key] += newResult[month][key];
          }
        }
      }
    } else monthlyReports.push({ ...newResult });
  }

  // yearly
  for (const i in monthlyReports) {
    const newResult = {};
    const month = Object.keys(monthlyReports[i])[0];
    const year = month.slice(3);
    newResult[year] = { ...monthlyReports[i][month] };

    const yearExists = yearlyReports.length === 0 ? false : yearlyReports.reduce(
      (exists, obj) => exists || Object.keys(obj)[0] === year, false,
    );

    if (yearExists) {
      for (const i in yearlyReports) {
        if (yearlyReports[i][year]) {
          for (const key in yearlyReports[i][year]) {
            yearlyReports[i][year][key] += newResult[year][key];
          }
        }
      }
    } else yearlyReports.push({ ...newResult });
  }

  const dailyTotals = [dailyReports.reduce(
    (acc, obj) => {
      acc.entries += Object.values(obj)[0].entries;
      acc.exits += Object.values(obj)[0].exits;
      acc.total += Object.values(obj)[0].total;
      return acc;
    },
    { period: 'Total', entries: 0, exits: 0, total: 0 },
  )];

  const monthlyTotals = [monthlyReports.reduce(
    (acc, obj) => {
      acc.entries += Object.values(obj)[0].entries;
      acc.exits += Object.values(obj)[0].exits;
      acc.total += Object.values(obj)[0].total;
      return acc;
    },
    { period: 'Total', entries: 0, exits: 0, total: 0 },
  )];

  const yearlyTotals = [yearlyReports.reduce(
    (acc, obj) => {
      acc.entries += Object.values(obj)[0].entries;
      acc.exits += Object.values(obj)[0].exits;
      acc.total += Object.values(obj)[0].total;
      return acc;
    },
    { period: 'Total', entries: 0, exits: 0, total: 0 },
  )];

  return {
    daily: dailyReports,
    monthly: monthlyReports,
    yearly: yearlyReports,
    dailyTotals,
    monthlyTotals,
    yearlyTotals,
  };
}
