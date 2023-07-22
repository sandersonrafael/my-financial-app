/* eslint-disable no-console */
const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}\nAcesse: http://localhost:${port}`);
});

