import { Link } from 'react-router-dom';
import { Container, Main, MainHeader, Input, P } from './styles';
import { AskCamp } from './styles';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';

export default function Login() {
  return (
    <Container>
      <Main>
        <MainHeader>Faça Login</MainHeader>

        <P>Tenha o controle da sua vida financeira</P>

        <Input type="text" placeholder="Digite seu E-mail" />
        <Input type="password" placeholder="Digite sua Senha" />

        <AskCamp>
          <Link to="/forgot-password">Esqueceu sua senha?</Link>
        </AskCamp>

        <PrimaryButton style={{ margin: '0 40px 15px' }}>Entrar</PrimaryButton>

        <P>Não possui uma conta?</P>

        <SecondaryButton style={{ margin: '0 40px 20px' }}>
          Registre-se
        </SecondaryButton>

        <P>Ou: <span>Entre sem uma conta</span></P>
      </Main>
    </Container>
  );
}
