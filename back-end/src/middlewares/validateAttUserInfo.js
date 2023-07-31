const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const validateAttUserInfos = async (req, res, next) => {
  try {
    const errors = {
      nameMsgs: [],
      emailMsgs: [],
      newPasswordMsgs: [],
      repeatNewPasswordMsgs: [],
    };

    if (req.body.changeInfos && req.body.changePassword) return res.status(400).json({
      message: 'Não é permitido alterar a senha e os dados do usuário ao mesmo tempo.',
    }); else if (!req.body.password) return res.status(400).json({
      message: 'Necessário informar a senha para validar a alteração.',
    });

    const { password } = req.body;
    const user = await User.findById(req.params.id);

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return res.status(401).json({ message: 'Senha atual incorreta.' });

    if (req.body.changeInfos) {
      const { name, email } = req.body.changeInfos;
      delete errors.newPasswordMsgs && delete errors.repeatNewPasswordMsgs;

      if (!name || !email) return res.status(400).json({
        message: 'Necessário informar um name e um email.',
      });

      if (name.length === 0) errors.nameMsgs.push('Nome não pode estar vazio');
      if (name.match(/[0-9]/g)) errors.nameMsgs.push('Nome não pode conter números');
      if (name.indexOf(' ') === -1) errors.nameMsgs.push(
        'Necessário informar pelo menos dois nomes',
      );

      if (email.length === 0) errors.emailMsgs.push('E-mail não pode estar vazio');
      else if (!validator.isEmail(email)) errors.emailMsgs.push('E-mail inválido');

      const emailExists = await User.findOne({ email });
      if (email !== user.email && emailExists) errors.emailMsgs.push(
        'E-mail informado já está em uso',
      );

      if (errors.nameMsgs.length !== 0 || errors.emailMsgs.length !== 0)
        return res.status(400).json(errors);
    }

    if (req.body.changePassword) {
      const { newPassword, repeatNewPassword } = req.body.changePassword;
      delete errors.nameMsgs && delete errors.emailMsgs;

      if (!newPassword || !repeatNewPassword) return res.status(400).json({
        message: 'Necessário informar um newPassword e um repeatNewPassword.',
      });

      if (newPassword.length < 4 || newPassword?.length > 16)
        errors.newPasswordMsgs.push('Nova senha deve conter de 4 a 16 caracteres');
      if (
        !newPassword.match(/[a-z]/g) ||
        !newPassword.match(/[A-Z]/g) ||
        !newPassword.match(/[0-9]/g) ||
        !newPassword.match(/[\W]/g)
      ) errors.newPasswordMsgs.push(
        'Nova senha deve conter letras maiúsculas, minúsculas, números e símbolos',
      );
      if (newPassword.indexOf(' ') !== -1) errors.newPasswordMsgs.push(
        'Nova senha não pode conter espaços',
      );

      if (repeatNewPassword.length === 0)
        errors.repeatNewPasswordMsgs.push('A confirmação de senha não pode estar em branco');
      if (newPassword !== repeatNewPassword)
        errors.repeatNewPasswordMsgs.push('Nova senha e confirmação da nova senha não conferem');

      if (errors.newPasswordMsgs.length !== 0 || errors.repeatNewPasswordMsgs.length !== 0)
        return res.status(400).json(errors);

      req.body.changePassword.newPassword = await bcrypt.hash(newPassword, 12);
    }

    return next();

  } catch(error) {
    res.status(400).json({ message: 'Erro durante a operação.', error });
  }
};

module.exports = validateAttUserInfos;
