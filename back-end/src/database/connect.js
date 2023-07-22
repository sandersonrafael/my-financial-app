/* eslint-disable no-console */
const mongoose = require('mongoose');

const mongodbUrl = process.env.MONGODB_URL;

const connect = () => mongoose.connect(mongodbUrl)
  .then(() => console.log('MongoDB conectado'))
  .catch(() => console.log('Falha na conexão com a base de dados'));

connect();

module.exports = mongoose;
