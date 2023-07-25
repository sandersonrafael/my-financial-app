const jwt = require('jsonwebtoken');

const validateUserToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')?.[1];
    const secret = process.env.SECRET;

    const { id } = jwt.verify(token, secret);

    if (id !== req.params.id) return res.status(401).json({ message: 'Token inválido!' });

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Falha na autenticação do usuário.' });
  }
};

module.exports = validateUserToken;
