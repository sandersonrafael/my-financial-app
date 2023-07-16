import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, DaysGrid, MonthsFlex } from './styles';
import getCalendar from './js/getCalendar';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs';
import defaultDaysList from './defaultValues/daysList';
import defaultMonthsList from './defaultValues/monthsList';

export default function Calendar({
  setReturn,
  style,
  monthsList = defaultMonthsList,
  daysList = defaultDaysList,
  primaryColor,
}) {
  const [relativeMonth, setRelativeMonth] = useState(0);
  const [whiteSpaces, setWhiteSpaces] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [dateButtons, setDateButtons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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

    if (relativeMonth === 0) setSelectedDate(new Date().getDate());
    else setSelectedDate(null);
  }, [relativeMonth]);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setReturn({
      year: calendar.currentYear,
      month: calendar.currentMonth,
      date,
    });
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
      <MonthsFlex $primaryColor={primaryColor}>
        <BsArrowLeftSquareFill onClick={() => setRelativeMonth((v) => v - 1)} />
        <h1>{monthsList[calendar.currentMonth]}, {calendar.currentYear}</h1>
        <BsArrowRightSquareFill
          onClick={() => setRelativeMonth((v) => v + 1)}
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
};
