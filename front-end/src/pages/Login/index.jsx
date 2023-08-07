import { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Main, MainHeader, Input, P, Spacing } from './styles';
import { AskCamp } from './styles';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import Error from '../../components/Error';
import { userLogin, userRegister } from '../../db/dataProcess';
import Loading from '../../components/Loading';

export default function Login({ setLoggedIn, loading }) {
  const [registerFields, setRegisterFields] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [manualEnterLoading, setManualEnterLoading] = useState(false);

  const handleChangeLoginRegister = () => {
    setRegisterFields(!registerFields);
    setErrors({});
    setName('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
  };

  const handleLoginOrRegister = async () => {
    setManualEnterLoading(true);
    const connectUser = registerFields
      ? await userRegister(name, email, password, repeatPassword)
      : await userLogin(email, password);
    setManualEnterLoading(false);
    if (connectUser.id) {
      setName(connectUser.name);
      setEmail(connectUser.email);
      setLoggedIn(true);
      setErrors({});
    } else setErrors({ ...connectUser });
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Main>
          <MainHeader>
            {registerFields ? 'Crie Sua Conta' : 'Faça Login'}
          </MainHeader>

          <P>Tenha o controle da sua vida financeira!</P>

          {registerFields && (
            <Input
              type="text"
              placeholder="Digite o nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {errors.nameMsgs &&
          errors.nameMsgs.map((value, key) => (
            <Error key={key}>{value}</Error>
          ))}

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

          {errors.message && <Error>{errors.message}</Error> }
          <PrimaryButton
            style={{ margin: '10px 40px 15px' }}
            onClick={handleLoginOrRegister}
          >
            {manualEnterLoading ? (
              <Loading $sz={21} style={{ margin: '0 auto' }} />
            ) : (
              registerFields ? 'Registrar-se' : 'Entrar'
            )}
          </PrimaryButton>

          <P>{registerFields ? 'Já' : 'Ainda não'} possui uma conta?</P>

          <SecondaryButton
            style={{ margin: `5px 40px ${registerFields ? '33px' : '10px'}` }}
            onClick={handleChangeLoginRegister}
          >
            {registerFields ? 'Faça Login' : 'Registre-se'}
          </SecondaryButton>

          {!registerFields && <Spacing />}
        </Main>
      )}
    </Container>
  );
}

Login.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
