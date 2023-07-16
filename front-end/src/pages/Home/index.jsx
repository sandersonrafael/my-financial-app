import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
import { BsFillArrowDownCircleFill, BsFillPlusCircleFill } from 'react-icons/bs';

import Calendar from '../../components/Calendar';
import { Body, BodyMain, BodyTop, Container, Footer, Header } from './styles';
import { primaryColor } from '../../colors/colors';
import { useEffect, useState } from 'react';

export default function Home({ userName, loggedIn }) {
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [date, setDate] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    setCalendarVisibility(false);
  }, [date]);

  return (
    <Container>
      <Header>
        <div>
          <Link to="/">
            <img src={logo} alt="My Financial App" />
          </Link>
          <div>
            <Link>Home</Link>
            <Link>Finanças</Link>
            <Link>Relatórios</Link>
            <Link>{ loggedIn ? 'Dados de Usuário' : 'Fazer Login'}</Link>
          </div>
        </div>
      </Header>

      <Body>
        <BodyTop>
          <h1>Boas vindas, {userName || 'visitante'}!</h1>
        </BodyTop>

        <BodyMain>
          <h2>Balanço Financeiro</h2>
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
              <div style={{
                display: calendarVisibility ? 'flex' :'none',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, .9)',
              }}>
                <Calendar setReturn={setDate} />
              </div>
            </div>

            <div>
              <button>
                <BsFillPlusCircleFill />
                {'Entrada / Saída'}
              </button>
            </div>
          </section>
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
