import { useEffect, useState } from 'react';
import Calendar from '../../components/Calendar';
import { BackgroundTop, Container, Main } from './styles';
import { BiSolidDownArrowCircle, BiSolidUpArrowCircle } from 'react-icons/bi';

export default function Home() {
  const [userName, setUserName] = useState('Visitante');
  const [date, setDate] = useState({});
  const [showCalendar, setShowCalendar] = useState(true);

  const handleArrowClick = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    setShowCalendar((value) => !value);
  }, [date]);

  return (
    <Container>
      <BackgroundTop>
        <h1>Boas vindas, {userName}!</h1>
      </BackgroundTop>
      <Main>
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
      </Main>
    </Container>
  );
}
