import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  BsFillArrowDownCircleFill,
  BsFillPlusCircleFill,
} from 'react-icons/bs';

import Calendar from '../../components/Calendar';
import { Body, BodyMain, BodyTop, Container, Footer, Header } from './styles';
import { primaryColor } from '../../colors/colors';
import { useEffect, useState } from 'react';
import FinancialGrid from './FinancialGrid';
import NewExpenseGrid from './NewExpenseGrid';
// import { getDailyReportStorage } from '../../db/localStorage';
import { loadExpenses } from '../../db/dataProcess';

const logo = 'https://images2.imgbox.com/50/4c/tVvk0H0O_o.png';

const load = async (date) => {
  const { fullReport } = await loadExpenses();
  return fullReport?.[date.year]?.[date.month]?.[date.date] || [];
};

export default function Home({ loggedIn }) {
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

  const handleLogout = () => {
    localStorage.removeItem('userAccess');
    window.reload();
  };

  return (
    <Container>
      <Header>
        <div>
          <Link to="/">
            <img src={logo} alt="My Financial App" />
          </Link>
          <div>
            <Link to="/user">{loggedIn ? 'Meus Dados' : 'Fazer Login'}</Link>
            <Link to="/reports">Meus Relatórios</Link>
            {loggedIn && <Link to="/" onClick={handleLogout} >Fazer Logout</Link>}
          </div>
        </div>
      </Header>

      <Body>
        <BodyTop>
          <h1>Boas vindas, {localStorage.getItem('userAccess')?.split(' ')[2] || 'visitante'}!</h1>
        </BodyTop>

        <BodyMain>
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
        </BodyMain>
      </Body>

      <Footer>
        <p>
          Site desenvolvido por
          <a
            href="https://linkedin.com/in/sandersonrafael"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sanderson Rafael
          </a>
        </p>
      </Footer>
    </Container>
  );
}

Home.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};
