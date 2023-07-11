import validator from 'validator';

export const validateLogin = (email, password) => {
  email = email.toLowerCase();

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

  if (errors.emailMsgs.length === 0 && errors.passwordMsgs.length === 0)
    'function that send email and password to database'; // !important
  return errors;
};

export const validateRegister = (email, password, repeatPassword) => {
  email = email.toLowerCase();

  const errors = {
    emailMsgs: [],
    passwordMsgs: [],
    repeatPasswordMsgs: [],
  };

  if (repeatPassword.length === 0) errors.repeatPasswordMsgs
    .push('A confirmação de senha não pode estar em branco');
  else if (password !== repeatPassword) errors.repeatPasswordMsgs
    .push('A senha informada é diferente da confirmação');

  if (
    errors.emailMsgs.length === 0 &&
    errors.passwordMsgs.length === 0 &&
    errors.repeatPasswordMsgs.length === 0
  )
    'function that send email and password to database'; // !important
  return errors;
};
