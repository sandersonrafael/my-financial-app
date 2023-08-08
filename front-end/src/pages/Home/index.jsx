import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Page404 from './Page404';
import DailyReport from './DailyReport';
import UserData from './UserData';
import Reports from './Reports';
import { Body, BodyMain, BodyTop, Container, Footer, Header } from './styles';

const logo = 'https://images2.imgbox.com/50/4c/tVvk0H0O_o.png';

export default function Home() {
  const handleLogout = () => {
    localStorage.removeItem('userAccess');
    window.reload();
  };

  return (
    <BrowserRouter>
      <Container>
        <Header>
          <div>
            <Link to="/">
              <img src={logo} alt="My Financial App" />
            </Link>
            <div>
              <Link to="/">Home</Link>
              <Link to="/reports">Relatórios</Link>
              <Link to="/user">Meus Dados</Link>
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </div>
          </div>
        </Header>

        <Body>
          <BodyTop>
            <h1>Boas vindas, {localStorage.getItem('userAccess')?.split(' ')[3]}!</h1>
          </BodyTop>

          <BodyMain>
            <Routes>
              <Route path="/" element={<DailyReport />} />
              <Route path="#/reports" element={<Reports />} />
              <Route path="#/user" element={<UserData />} />
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
