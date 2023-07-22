const express = require('express');
const cors = require('cors');
const router = require('./router');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

require('./database/connect');

module.exports = app;
