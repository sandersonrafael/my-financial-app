import { useEffect, useState } from 'react';
import { BsFillArrowDownCircleFill, BsFillPlusCircleFill } from 'react-icons/bs';

import { primaryColor } from '../../../colors/colors';
import Calendar from '../../../components/Calendar';
import { loadExpenses } from '../../../db/dataProcess';

import FinancialGrid from '../FinancialGrid';
import NewExpenseGrid from '../NewExpenseGrid';

const load = async (date) => {
  const { fullReport } = await loadExpenses();
  return fullReport?.[date.year]?.[date.month]?.[date.date] || [];
};

export default function DailyReport() {
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [newExpenseVisibility, setNewExpenseVisibility] = useState(false);
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
  });
  const [userExpenses, setUserExpenses] = useState([]);

  useEffect(() => {
    const attList = async () => setUserExpenses(await load(date));
    attList();
  }, []);

  useEffect(() => {
    const attList = async () => setUserExpenses(await load(date));
    attList();
    setCalendarVisibility(false);
  }, [date]);

  const handleNewExpenseClick = () => {
    setNewExpenseVisibility(true);
  };

  return (
    <>
      <h2>Relatório Diário</h2>
      <section>
        <div>
          <button
            style={{
              backgroundColor: '#fff',
              color: '#000',
            }}
            onClick={() => setCalendarVisibility(true)}
          >
            {date.date < 10 ? `0${date.date}` : date.date}/
            {date.month + 1 < 10 ? `0${date.month + 1}` : date.month + 1}/
            {date.year}
            <BsFillArrowDownCircleFill style={{ color: primaryColor }} />
          </button>
          <div
            style={{
              display: calendarVisibility ? 'flex' : 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, .9)',
            }}
          >
            <Calendar setReturn={setDate} />
          </div>
        </div>

        <div>
          <button onClick={handleNewExpenseClick}>
            <BsFillPlusCircleFill />
            {'Adicionar'}
          </button>
          {newExpenseVisibility && (
            <NewExpenseGrid
              date={date}
              setVisibility={setNewExpenseVisibility}
              setUserExpenses={setUserExpenses}
            />
          )}
        </div>
      </section>

      <FinancialGrid
        date={date}
        userExpenses={userExpenses}
        setUserExpenses={setUserExpenses}
      />
    </>
  );
}
