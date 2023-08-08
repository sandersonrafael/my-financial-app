import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Page404 from './Page404';
import DailyReport from './DailyReport';
import UserData from './UserData';
import Reports from './Reports';
import { Body, BodyMain, BodyTop, Container, Footer, Header } from './styles';
import { useState } from 'react';

const logo = 'https://images2.imgbox.com/50/4c/tVvk0H0O_o.png';

export default function Home() {
  const [hambugerMenuOpen, setHambugerMenuOpen] = useState(false);

  const handleLogout = () => {
    setHambugerMenuOpen(false);
    localStorage.removeItem('userAccess');
    window.reload();
  };

  return (
    <BrowserRouter>
      <Container>
        <Header $hambugerMenuOpen={hambugerMenuOpen}>
          <div>
            <Link to="/">
              <img src={logo} alt="My Financial App" />
            </Link>
            <div>
              <Link to="/" onClick={() => setHambugerMenuOpen(false)}>Home</Link>
              <Link to="/reports" onClick={() => setHambugerMenuOpen(false)}>Relatórios</Link>
              <Link to="/user" onClick={() => setHambugerMenuOpen(false)}>Meus Dados</Link>
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </div>
            <button
              style={{ width: 50, height: 50, fontSize: 32 }}
              onClick={() => setHambugerMenuOpen(!hambugerMenuOpen)}
            >
              {hambugerMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </Header>

        <Body>
          <BodyTop>
            <h1>Boas vindas, {localStorage.getItem('userAccess')?.split(' ')[3]}!</h1>
          </BodyTop>

          <BodyMain>
            <Routes>
              <Route path="/" element={<DailyReport />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/user" element={<UserData />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
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
    </BrowserRouter>
  );
}
