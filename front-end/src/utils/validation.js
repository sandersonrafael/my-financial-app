import validator from 'validator';

export const validateLogin = (email, password) => {
  const errors = {
    emailMsgs: [],
    passwordMsgs: [],
  };

  if(email.length === 0)
    errors.emailMsgs.push('E-mail não pode estar em branco');
  else if (email.includes(' '))
    errors.emailMsgs.push('E-mail não pode conter espaços em branco');
  else if (!validator.isEmail(email)) errors.emailMsgs.push('E-mail inválido');

  // email not found in database ->
  // register yourself to access or try another e-mail

  if (password.length === 0)
    errors.passwordMsgs.push('Senha não pode estar em branco');
  else if (password.length < 6 || password.length > 24)
    errors.passwordMsgs.push('Senha precisa ter de 6 a 24 caracteres');
  if (password.includes(' '))
    errors.passwordMsgs.push('Senha não pode conter espaços em branco');

  // check if matches login and password and return email error if no

  return errors;
};

export const validateRegister = (email, password, repeatPassword) => {
  const errors = {
    emailMsgs: [],
    passwordMsgs: [],
    repeatPasswordMsgs: [],
  };

  if (repeatPassword.length === 0) errors.repeatPasswordMsgs
    .push('A confirmação de senha não pode estar em branco');
  else if (password !== repeatPassword) errors.repeatPasswordMsgs
    .push('A senha informada é diferente da confirmação');
  return errors;
};

