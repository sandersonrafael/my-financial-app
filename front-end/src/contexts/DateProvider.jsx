import { useState } from 'react';
import DateContext from './DateContext';

import PropTypes from 'prop-types';

export default function DateProvider({ children }) {
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
  });
  const [period, setPeriod] = useState('daily');
  const [mostRecentDate, setMostRecentDate] = useState(true);

  const value = {
    date,
    setDate,
    period,
    setPeriod,
    mostRecentDate,
    setMostRecentDate,
  };

  return (
    <DateContext.Provider value={value} >
      {children}
    </DateContext.Provider>
  );
}

DateProvider.propTypes = {
  children: PropTypes.node,
};
