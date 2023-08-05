import validator from 'validator';

const validateName = (name = '') => {
  const nameMsgs = [];

  if (name.length === 0) nameMsgs.push('Nome não pode estar vazio');
  else if (name.indexOf(' ') === -1) nameMsgs.push(
    'Necessário informar pelo menos dois nomes',
  );
  else if (name.match(/[0-9]/g)) nameMsgs.push('Nome não pode conter números');

  return nameMsgs;
};

const validateEmail = (email = '') => {
  email = email.toLowerCase();
  const emailMsgs = [];

  if(email.length === 0)
    emailMsgs.push('E-mail não pode estar em branco');
  else if (!validator.isEmail(email)) emailMsgs.push('E-mail inválido');

  return emailMsgs;
};

const validatePassword = (password = '') => {
  const passwordMsgs = [];

  if (password.length < 4 || password.length > 16)
    passwordMsgs.push('Senha deve conter de 4 a 16 caracteres');
  else if (password.indexOf(' ') !== -1) passwordMsgs.push('Senha não pode conter espaços');
  else if (
    !password.match(/[a-z]/g) ||
    !password.match(/[A-Z]/g) ||
    !password.match(/[0-9]/g) ||
    !password.match(/[\W]/g)
  ) passwordMsgs.push(
    'Senha deve conter letras maiúsculas, minúsculas, números e símbolos',
  );

  return passwordMsgs;
};

const validateRepeatPassword = (password = '', repeatPassword = '') => {
  const repeatPasswordMsgs = [];

  if (repeatPassword.length === 0) repeatPasswordMsgs
    .push('A confirmação de senha não pode estar em branco');
  else if (password !== repeatPassword) repeatPasswordMsgs
    .push('Senha e confirmação de senha não conferem');

  return repeatPasswordMsgs;
};

export const validateLogin = (email, password) => {
  const errors = {};

  errors.emailMsgs = validateEmail(email);
  errors.passwordMsgs = validatePassword(password);

  if (errors.emailMsgs.length !== 0 || errors.passwordMsgs.length !== 0) return errors;
};

export const validateRegister = (name, email, password, repeatPassword) => {
  const errors = {};

  errors.nameMsgs = validateName(name);
  errors.emailMsgs = validateEmail(email);
  errors.passwordMsgs = validatePassword(password);
  errors.repeatPasswordMsgs = validateRepeatPassword(password, repeatPassword);

  if (
    errors.nameMsgs.length !== 0 ||
    errors.emailMsgs.length !== 0 ||
    errors.passwordMsgs.length !== 0 ||
    errors.repeatPasswordMsgs.length !== 0
  ) return errors;
};

export const validateAttUserData = (name, email, password, newPassword, repeatNewPassword) => {
  const errors = {};

  errors.nameMsgs = validateName(name);
  errors.emailMsgs = validateEmail(email);
  errors.passwordMsgs = validatePassword(password);
  errors.newPasswordMsgs = validatePassword(newPassword);
  errors.repeatNewPasswordMsgs = validateRepeatPassword(newPassword, repeatNewPassword);

  if (
    errors.nameMsgs.length !== 0 ||
    errors.emailMsgs.length !== 0 ||
    errors.passwordMsgs.length !== 0 ||
    errors.newPasswordMsgs.length !== 0 ||
    errors.repeatNewPasswordMsgs.length !== 0
  ) return errors;
};

export const validateNewExpense = ({ title, category, value, expense }) => {
  const errors = ['', '', '', ''];

  if (!title) errors[0] = 'Título não pode estar em branco';
  else if (typeof title !== 'string') errors[0] = 'Necessário informar um Título válido';

  if (!category) errors[1] = 'Categoria não pode estar em branco';
  else if (typeof category !== 'string') errors[1] = 'Necessário informar uma Categoria válida';

  if (!value) errors[2] = 'Valor não pode ser zero ou vazio';
  else if (typeof value !== 'number') errors[2] = 'Necessário informar um Valor válido';

  if (typeof expense !== 'boolean') errors[3] = 'Necessário informar se é despesa ou receita';
  return errors;
};
