const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const validateUserLogin = async (req, res, next) => {
  try {
    req.body.email = req.body.email?.toLowerCase();
    const { email, password } = req.body;
    const errors = {
      emailMsgs: [],
      passwordMsgs: [],
    };

    if (!email || !password) return res.status(400).json({
      message: 'Necessário preencher todos os campos',
    });

    //email validate
    if (email.length === 0) errors.emailMsgs.push('E-mail não pode estar vazio');
    else if (!validator.isEmail(email)) errors.emailMsgs.push('E-mail inválido');

    //password validate
    if (password.length < 4 || password.length > 16)
      errors.passwordMsgs.push('Senha deve conter de 4 a 16 caracteres');
    if (
      !password.match(/[a-z]/g) ||
      !password.match(/[A-Z]/g) ||
      !password.match(/[0-9]/g) ||
      !password.match(/[\W]/g)
    ) errors.passwordMsgs.push(
      'Senha deve conter letras maiúsculas, minúsculas, números e símbolos',
    );
    if (password.indexOf(' ') !== -1) errors.passwordMsgs.push('Senha não pode conter espaços');

    if (errors.emailMsgs.length !== 0 || errors.passwordMsgs.length !== 0)
      return res.status(400).json(errors);

    //user validate
    const dbUser = await User.findOne({ email });
    if (!dbUser) return res.status(401).json({
      message: 'E-mail ou senha inválidos.',
    });

    try {
      const passwordMatches = await bcrypt.compare(password, dbUser.password);
      if (!passwordMatches) return res.status(401).json({
        message: 'E-mail ou senha inválidos.',
      });
    } catch(err) {
      return res.status(500).json({
        message: 'Ocorreu um erro no servidor. Tente novamente mais tarde!',
      });
    }
    req.body.id = dbUser._id;
    req.body.name = dbUser.name;

    return next();

  } catch(error) {
    res.status(400).json({ message: 'Erro durante a operação.', error });
  }
};

module.exports = validateUserLogin;
