const express = require('express');
const cors = require('cors');
const router = require('./router');
require('dotenv').config();

const app = express();

let whiteList;

try {
  whiteList = JSON.parse(process.env.WHITE_LIST);
} catch(error) {
  whiteList = [];
  // eslint-disable-next-line no-console
  console.log(new Error(
    'WHITE_LIST is not a valid json. Check his value and structure and restart the server.',
  ));
}

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback();
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

require('./database/connect');

module.exports = app;
