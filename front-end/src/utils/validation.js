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
