const app = require('./app');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`Servidor executando na porta ${port}\nhttp://localhost:${port}`),
);
