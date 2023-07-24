const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.SECRET;
const days = process.env.EXPIRATION_DAYS;
const expiresIn = `${days}d`;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    const { _id: id } = await user.save();
    const token = jwt.sign({ id }, secret, { expiresIn });

    res.status(200).json({ success: 'Usuário criado com sucesso!', id, name, email, token });
  } catch(error) {
    res.status(500).json({
      message: 'Ocorreu um erro no servidor. Tente novamente mais tarde!',
    });
  }
};

const login = async (req, res) => {
  try {
    const { id, name, email } = req.body;
    const token = jwt.sign({ id }, secret, { expiresIn });

    res.status(200).json({ id, name, email, token });
  } catch(error) {
    res.status(500).json({ message: 'Ocorreu um erro no servidor. Tente novamente mais tarde!' });
  }
};

const access = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }, ['-password', '-__v']);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    return res.status(200).json(user);
  } catch(error) {
    res.status(500).json({ message: 'Ocorreu um erro no servidor. Tente novamente mais tarde!' });
  }
};

module.exports = {
  register,
  login,
  access,
};
