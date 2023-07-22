const User = require('../models/UserModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  user.save()
    .then(() => res.status(200).json({ message: 'Usuário criado com sucesso!' }))
    .catch((error) => {
      res.status(500).json({
        message: 'Ocorreu um erro no servidor. Tente novamente mais tarde!',
        dbError: error,
      });
    });
};

const login = async (req, res) => {
  const { id, name, email } = req.body;
  res.status(200).json({ id, name, email });
};

module.exports = {
  register,
  login,
};
