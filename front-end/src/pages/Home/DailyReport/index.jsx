import { useContext, useEffect, useState } from 'react';
import { BsFillArrowDownCircleFill, BsFillPlusCircleFill } from 'react-icons/bs';

import { primaryColor } from '../../../colors/colors';
import Calendar from '../../../components/Calendar';
import { loadExpenses } from '../../../db/dataProcess';

import FinancialGrid from '../FinancialGrid';
import NewExpenseGrid from '../NewExpenseGrid';
import DateContext from '../../../contexts/DateContext';
import Loading from '../../../components/Loading';

const load = async (date) => {
  const { fullReport } = await loadExpenses();
  return fullReport?.[date.year]?.[date.month]?.[date.date] || [];
};

export default function DailyReport() {
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [newExpenseVisibility, setNewExpenseVisibility] = useState(false);
  const [userExpenses, setUserExpenses] = useState([]);
  const { date, setDate } = useContext(DateContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const attList = async () => {
      setLoading(true);
      setUserExpenses(await load(date));
      setLoading(false);
    };
    attList();
  }, []);

  useEffect(() => {
    const attList = async () => {
      setLoading(true);
      setUserExpenses(await load(date));
      setLoading(false);
    };
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
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, .9)',
            }}
          >
            <div style={{ height: 396 }}>
              <Calendar
                setReturn={setDate}
                fullDate={date}
                handleCloseCalendar={() => setCalendarVisibility(false)}
              />
            </div>
          </div>
        </div>

        <div>
          <button onClick={handleNewExpenseClick}>
            <BsFillPlusCircleFill />
            {'Adicionar'}
          </button>
          {newExpenseVisibility && (
            <NewExpenseGrid
              setVisibility={setNewExpenseVisibility}
              setUserExpenses={setUserExpenses}
            />
          )}
        </div>
      </section>

      {loading ? (
        <Loading
          style={{ width: 60, height: 60, margin: '0 auto', padding: '20px 0' }}
          $cl={primaryColor}
          $sz={60}
        />
      ) : (
        <FinancialGrid
          userExpenses={userExpenses}
          setUserExpenses={setUserExpenses}
        />
      )}
    </>
  );
}
