const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const validateUserRegister = async (req, res, next) => {
  req.body.email = req.body.email.toLowerCase();
  const { name, email, password, repeatPassword } = req.body;
  const errors = {
    nameMsgs: [],
    emailMsgs: [],
    passwordMsgs: [],
    repeatPasswordMsgs: [],
  };

  if (!name || !email || !password || !repeatPassword) return res.status(400).json({
    message: 'Necessário preencher todos os campos antes de tentar realizar o registro',
  });

  // name validate
  if (name.length === 0) errors.nameMsgs.push('Nome não pode estar vazio');
  if (name.match(/[0-9]/g)) errors.nameMsgs.push('Nome não pode conter números');
  if (name.indexOf(' ') === -1) errors.nameMsgs.push('Necessário informar pelo menos dois nomes');

  //email validate
  if (email.length === 0) errors.emailMsgs.push('E-mail não pode estar vazio');
  if (!validator.isEmail(email)) errors.emailMsgs.push('E-mail inválido');

  const userExists = await User.findOne({ email: email });
  if (userExists) return res.status(400).json({
    message: 'E-mail informado já está em uso',
  });

  //password validate
  if (password.length < 4 || password?.length > 16)
    errors.passwordMsgs.push('Senha deve conter de 4 a 16 caracteres');
  if (
    !password.match(/[a-z]/g) ||
    !password.match(/[A-Z]/g) ||
    !password.match(/[0-9]/g) ||
    !password.match(/[\W]/g)
  ) errors.passwordMsgs.push('Senha deve conter letras maiúsculas, minúsculas, números e símbolos');
  if (password.indexOf(' ') !== -1) errors.passwordMsgs.push('Senha não pode conter espaços');

  //repeatPassword validate
  if (repeatPassword.length === 0)
    errors.repeatPasswordMsgs.push('A confirmação de senha não pode estar em branco');
  if (password !== repeatPassword)
    errors.repeatPasswordMsgs.push('Senha e confirmação de senha não conferem');

  if (
    errors.nameMsgs.length !== 0 ||
    errors.emailMsgs.length !== 0 ||
    errors.passwordMsgs.length !== 0 ||
    errors.repeatPasswordMsgs.length !== 0
  ) return res.status(400).json(errors);

  try {
    req.body.password = await bcrypt.hash(password, 12);
  } catch(e) {
    return res.status(500).json({
      message: 'Ocorreu um erro no servidor. Tente novamente mais tarde!',
    });
  }

  return next();
};

module.exports = validateUserRegister;
