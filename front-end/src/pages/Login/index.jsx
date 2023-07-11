import { useState } from 'react';
import PropTypes from 'prop-types';

import { AskCamp, Error } from './styles';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { validateLogin, validateRegister } from '../../utils/validation';
import { Container, Main, MainHeader, Input, P } from './styles';

export default function Login({ setLoggedIn }) {
  const [registerFields, setRegisterFields] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleChangeLoginRegister = () => {
    setRegisterFields(!registerFields);
    setErrors({});
    setEmail('');
    setPassword('');
    setRepeatPassword('');
  };

  const handleLoginOrRegister = () => {
    let newErrors = {};
    if (registerFields) {
      const { emailMsgs, passwordMsgs, repeatPasswordMsgs } = validateRegister(
        email,
        password,
        repeatPassword,
      );
      setErrors({ emailMsgs, passwordMsgs, repeatPasswordMsgs });
    } else {
      const { emailMsgs, passwordMsgs } = validateLogin(email, password);
      setErrors({ emailMsgs, passwordMsgs });
    }
    for ()

  };

  return (
    <Container>
      <Main>
        <MainHeader>
          {registerFields ? 'Crie Sua Conta' : 'Faça Login'}
        </MainHeader>

        <P>Tenha o controle da sua vida financeira!</P>

        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.emailMsgs &&
          errors.emailMsgs.map((value, key) => (
            <Error key={key}>{value}</Error>
          ))}

        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.passwordMsgs &&
          errors.passwordMsgs.map((value, key) => (
            <Error key={key}>{value}</Error>
          ))}

        {registerFields && (
          <>
            <Input
              type="password"
              placeholder="Confirme sua senha"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {errors.repeatPasswordMsgs &&
              errors.repeatPasswordMsgs.map((value, key) => (
                <Error key={key}>{value}</Error>
              ))}
          </>
        )}

        {!registerFields && (
          <AskCamp>
            <a>Esqueceu sua senha?</a>
          </AskCamp>
        )}

        <PrimaryButton
          style={{ margin: '10px 40px 15px' }}
          onClick={handleLoginOrRegister}
        >
          {registerFields ? 'Registrar-se' : 'Entrar'}
        </PrimaryButton>

        <P>{registerFields ? 'Já' : 'Ainda não'} possui uma conta?</P>

        <SecondaryButton
          style={{ margin: `5px 40px ${registerFields ? '33px' : '10px'}` }}
          onClick={handleChangeLoginRegister}
        >
          {registerFields ? 'Faça Login' : 'Registre-se'}
        </SecondaryButton>

        {!registerFields && (
          <P style={{ paddingBottom: 10 }}>
            Ou: <span>Entre sem uma conta</span>
          </P>
        )}
      </Main>
    </Container>
  );
}

Login.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
};
