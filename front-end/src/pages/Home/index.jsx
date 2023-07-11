import { useState } from 'react';
import { BackgroundTop, Container, Main } from './styles';

import Calendar from '../../components/Calendar';

export default function Home() {
  const [userName, setUserName] = useState('Visitante');
  const [date, setDate] = useState({ year: null, month: null, day: null });

  return (
    <Container>
      <BackgroundTop>
        <h1>Boas vindas, {userName}!</h1>
      </BackgroundTop>
      <Main>
        <h2>Comece selecionado uma data</h2>
        <hr />

        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Calendar />
        </div>
      </Main>
    </Container>
  );
}
