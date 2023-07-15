
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';

import { Body, BodyMain, BodyTop, Container, Footer, Header } from './styles';

export default function Home({ userName }) {
  return (
    <Container>
      <Header>
        <div>
          <Link to="/"><img src={logo} alt="My Financial App" /></Link>
          <div>
            <Link>Home</Link>
            <Link>Minha Conta</Link>
            <Link>Minhas Finanças</Link>
          </div>
        </div>
      </Header>

      <Body>
        <BodyTop>
          <h1>Boas vindas, {userName || 'visitante'}!</h1>
        </BodyTop>
        <BodyMain>
          <h2>Balanço Financeiro - 01/01/2021</h2>
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
};
