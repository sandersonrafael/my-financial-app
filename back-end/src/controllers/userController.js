const User = require('../models/UserModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    const { _id: id } = await user.save();
    res.status(200).json({
      success: 'Usuário criado com sucesso!',
      id,
      name,
      email,
    });
  } catch(error) {
    res.status(500).json({
      message: 'Ocorreu um erro no servidor. Tente novamente mais tarde!',
      dbError: error,
    });
  }
};

const login = async (req, res) => {
  const { id, name, email } = req.body;
  res.status(200).json({ id, name, email });
};

module.exports = {
  register,
  login,
};
