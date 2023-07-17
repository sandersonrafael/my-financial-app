import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
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

export default function Home({ userName, loggedIn }) {
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [newExpenseVisibility, setNewExpenseVisibility] = useState(false);
  const [userExpenses, setUserExpenses] = useState(
    /* localStorage.getItem('userExpenses') || [] */ [
      {
        title: 'Compra de celular novo',
        category: 'Eletrônicos',
        value: 1150.5,
        expense: true,
      },
      { title: 'Salário', category: 'Salário', value: 1320, expense: false },
      {
        title: 'Compra de carne',
        category: 'Alimentação',
        value: 50.7,
        expense: true,
      },
      {
        title: 'Venda de brinco',
        category: 'Vendas',
        value: 149.9,
        expense: false,
      },
    ],
  );
  const [date, setDate] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    setCalendarVisibility(false);
  }, [date]);

  const handleNewExpenseClick = () => {
    setNewExpenseVisibility(true);
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
            <Link to="/financial">Meu Financeiro</Link>
            <Link to="/reports">Meus Relatórios</Link>
          </div>
        </div>
      </Header>

      <Body>
        <BodyTop>
          <h1>Boas vindas, {userName || 'visitante'}!</h1>
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
              {newExpenseVisibility &&
                <NewExpenseGrid
                  setVisibility={setNewExpenseVisibility}
                  setUserExpenses={setUserExpenses}
                />
              }
            </div>
          </section>

          <FinancialGrid userExpenses={userExpenses} setUserExpenses={setUserExpenses} />
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
  userName: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
};
