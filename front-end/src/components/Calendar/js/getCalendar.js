const getDateInfos = () => {
  const date = new Date();

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  };
};

const getCurrentMonthAndYear = (relativeMonth = 0) => {
  const { year, month, date } = getDateInfos();
  const newDate = new Date(year, month + relativeMonth, date);
  const currentYear = newDate.getFullYear();
  const currentMonth = newDate.getMonth();
  return { currentYear, currentMonth };
};

const getDate = () => getDateInfos().date;

const getCurrentMonthLength = (relativeMonth = 0) => {
  const { year, month, date } = getDateInfos();
  const newDate = new Date(year, month + 1 + relativeMonth, date);
  newDate.setDate(0);
  const currentMonthLength = newDate.getDate();

  return currentMonthLength;
};

const getCurrentFirstDay = (relativeMonth = 0) => {
  const { year, month } = getDateInfos();
  const newDate = new Date(year, month + relativeMonth, 1);
  const currentMonthFirstDay = newDate.getDay();
  return currentMonthFirstDay;
};

const getCalendar = (relativeMonth = 0) => {
  const { currentYear, currentMonth } = getCurrentMonthAndYear(relativeMonth);
  const date = getDate();
  const currentMonthLength = getCurrentMonthLength(relativeMonth);
  const currentMonthFirstDay = getCurrentFirstDay(relativeMonth);
  return {
    currentYear,
    currentMonth,
    date,
    currentMonthLength,
    currentMonthFirstDay,
  };
};

export default getCalendar;
