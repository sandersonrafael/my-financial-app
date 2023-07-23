import validator from 'validator';

export const validateLogin = (email, password) => {
  email = email.toLowerCase();

  const errors = {
    emailMsgs: [],
    passwordMsgs: [],
  };

  if(email.length === 0)
    errors.emailMsgs.push('E-mail não pode estar em branco');
  else if (!validator.isEmail(email)) errors.emailMsgs.push('E-mail inválido');

  if (password.length < 4 || password.length > 16)
    errors.passwordMsgs.push('Senha deve conter de 4 a 16 caracteres');
  else if (password.indexOf(' ') !== -1) errors.passwordMsgs.push('Senha não pode conter espaços');
  else if (
    !password.match(/[a-z]/g) ||
    !password.match(/[A-Z]/g) ||
    !password.match(/[0-9]/g) ||
    !password.match(/[\W]/g)
  ) errors.passwordMsgs.push(
    'Senha deve conter letras maiúsculas, minúsculas, números e símbolos',
  );

  if (errors.emailMsgs.length !== 0 || errors.passwordMsgs.length !== 0) return errors;
};

export const validateRegister = (name, email, password, repeatPassword) => {
  email = email.toLowerCase();

  const errors = {
    nameMsgs: [],
    emailMsgs: [],
    passwordMsgs: [],
    repeatPasswordMsgs: [],
  };

  if (name.length === 0) errors.nameMsgs.push('Nome não pode estar vazio');
  else if (name.indexOf(' ') === -1) errors.nameMsgs.push(
    'Necessário informar pelo menos dois nomes',
  );
  else if (name.match(/[0-9]/g)) errors.nameMsgs.push('Nome não pode conter números');

  if (email.length === 0) errors.emailMsgs.push('E-mail não pode estar vazio');
  else if (!validator.isEmail(email)) errors.emailMsgs.push('E-mail inválido');

  if (password.length < 4 || password.length > 16)
    errors.passwordMsgs.push('Senha deve conter de 4 a 16 caracteres');
  else if (
    !password.match(/[a-z]/g) ||
    !password.match(/[A-Z]/g) ||
    !password.match(/[0-9]/g) ||
    !password.match(/[\W]/g)
  ) errors.passwordMsgs.push(
    'Senha deve conter letras maiúsculas, minúsculas, números e símbolos',
  );
  else if (password.indexOf(' ') !== -1) errors.passwordMsgs.push('Senha não pode conter espaços');

  if (repeatPassword.length === 0) errors.repeatPasswordMsgs
    .push('A confirmação de senha não pode estar em branco');
  else if (password !== repeatPassword) errors.repeatPasswordMsgs
    .push('Senha e confirmação de senha não conferem');

  if (
    errors.nameMsgs.length !== 0 ||
    errors.emailMsgs.length !== 0 ||
    errors.passwordMsgs.length !== 0 ||
    errors.repeatPasswordMsgs.length !== 0
  ) return errors;
};
