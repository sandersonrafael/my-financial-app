import { useEffect, useState } from 'react';
import Calendar from '../../components/Calendar';
import { BackgroundTop, Container, DateSelector, Main } from './styles';
import { BiSolidDownArrowCircle, BiSolidUpArrowCircle } from 'react-icons/bi';
import { monthsList } from '../../utils/dateArrays';

export default function Home() {
  const [userName, setUserName] = useState('Visitante');
  const [date, setDate] = useState({});
  const [showCalendar, setShowCalendar] = useState(false); //botar true

  const handleArrowClick = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();
    setDate({ year, month, date });
  }, []);

  useEffect(() => {
    setShowCalendar((value) => !value);
  }, [date]);

  return (
    <Container>
      <BackgroundTop>
        <h1>Boas vindas, {userName}!</h1>
      </BackgroundTop>
      <DateSelector>
        <h2 onClick={handleArrowClick}>
          Selecione uma data
          {showCalendar ? <BiSolidUpArrowCircle /> : <BiSolidDownArrowCircle />}
        </h2>
        <hr style={{ display: showCalendar ? 'block' : 'none' }} />

        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></div>
        <Calendar
          setReturn={setDate}
          style={{
            width: 'calc(100% - 20px)',
            maxWidth: 500,
            margin: '0 auto',
            boxShadow: 'none',
            paddingBottom: 20,
            zIndex: -1,
            display: showCalendar ? 'block' : 'none',
          }}
        />
      </DateSelector>
      <Main>
        <header>
          <h1>
            <span>{date.date < 10 ? '0' + date.date : date.date} de </span>
            <span>{monthsList[date.month]} de </span>
            <span>{date.year}</span>
          </h1>
          <hr />
        </header>

        <div>
          entradas e saídas, etc...
        </div>
        <hr />
        <footer>resultados etc...</footer>
      </Main>
    </Container>
  );
}
