import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, DaysGrid, MonthsFlex } from './styles';
import getCalendar from './js/getCalendar';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import defaultDaysList from './defaultValues/daysList';
import defaultMonthsList from './defaultValues/monthsList';
import DateContext from '../../contexts/DateContext';
import yearsMap from './js/yearsMap';

export default function Calendar({
  setReturn,
  style,
  monthsList = defaultMonthsList,
  daysList = defaultDaysList,
  primaryColor,
  handleCloseCalendar,
}) {
  const [relativeMonth, setRelativeMonth] = useState(0);
  const [whiteSpaces, setWhiteSpaces] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [dateButtons, setDateButtons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { date: fullDate } = useContext(DateContext);
  const [selectYear, setSelectYear] = useState(fullDate.year);

  useEffect(() => {
    const newCalendar = getCalendar(relativeMonth);
    setCalendar(newCalendar);

    const newWhiteSpaces = [];
    const newDateButtons = [];
    for (let i = 1; i <= newCalendar.currentMonthLength; i++) {
      if (i <= newCalendar.currentMonthFirstDay) newWhiteSpaces.push('');
      newDateButtons.push(i);
    }

    setWhiteSpaces(newWhiteSpaces);
    setDateButtons(newDateButtons);

    const today = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    };
    const { year, month } = fullDate;
    const newRelativeMonth = (year - today.year) * 12 + (month - today.month);

    if (relativeMonth === newRelativeMonth)setSelectedDate(fullDate.date);
    else setSelectedDate(null);
  }, [relativeMonth]);

  useEffect(() => {
    const { year, month, date } = fullDate;
    const today = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    };
    const newRelativeMonth = (year - today.year) * 12 + (month - today.month);
    const newCalendar = getCalendar(newRelativeMonth);
    setRelativeMonth(newRelativeMonth);
    setCalendar(newCalendar);
    setSelectedDate(date);
  }, [fullDate]);

  const handleChangeYear = (e) => {
    setSelectYear(Number(e.target.value));
    const today = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    };
    const { month } = fullDate;
    const year = Number(e.target.value);
    const newRelativeMonth = (year - today.year) * 12 + (month - today.month);
    setRelativeMonth(newRelativeMonth);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setReturn({
      year: calendar.currentYear,
      month: calendar.currentMonth,
      date,
    });
  };

  const handleSubMonth = () => {
    if (selectYear > yearsMap[0]) {
      setRelativeMonth((v) => v - 1);
      if (calendar.currentMonth === 0) setSelectYear((year) => year - 1);
    } else {
      if (calendar.currentMonth > 0) setRelativeMonth((v) => v - 1);
    }
  };

  const handleAddMonth = () => {
    if (selectYear < yearsMap[yearsMap.length - 1]) {
      setRelativeMonth((v) => v + 1);
      if (calendar.currentMonth === 11) setSelectYear((year) => year + 1);
    } else {
      if (calendar.currentMonth < 11) setRelativeMonth((v) => v + 1);
    }
  };

  const dateIsGray = (date) => {
    const now = new Date().getTime();
    const checkDate = new Date(
      calendar.currentYear,
      calendar.currentMonth,
      date,
    ).getTime();

    return checkDate > now;
  };

  return (
    <Container style={style}>

      <select onChange={handleChangeYear} value={selectYear} >
        {yearsMap.map((year, key) => <option value={year} key={key}>{year}</option>)}
      </select>

      <button onClick={handleCloseCalendar}>
        <GrClose />
      </button>

      <MonthsFlex $primaryColor={primaryColor}>
        <BsArrowLeftSquareFill onClick={handleSubMonth} />
        <h2>{monthsList[calendar.currentMonth]}</h2>
        <BsArrowRightSquareFill
          onClick={handleAddMonth}
        />
      </MonthsFlex>
      <hr />
      <DaysGrid>
        {daysList.map((dayName, key) => (
          <span key={key}>{dayName}</span>
        ))}
        {whiteSpaces.map((_white, key) => (
          <span key={key} />
        ))}
        {dateButtons.map((date, key) => (
          <Button
            type="button"
            key={key}
            onClick={() => handleSelectDate(date)}
            selected={selectedDate === date}
            $dateIsGray={dateIsGray(date)}
            $primaryColor={primaryColor}
          >
            {date}
          </Button>
        ))}
      </DaysGrid>
    </Container>
  );
}

Calendar.propTypes = {
  setReturn: PropTypes.func.isRequired,
  style: PropTypes.object,
  monthsList: PropTypes.arrayOf(PropTypes.string),
  daysList: PropTypes.arrayOf(PropTypes.string),
  primaryColor: PropTypes.string,
  handleCloseCalendar: PropTypes.func,
};
