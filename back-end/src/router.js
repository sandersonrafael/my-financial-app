const express = require('express');
const router = express.Router();

const validateUserRegister = require('./middlewares/validateUserRegister');
const userController = require('./controllers/userController');

router.post('/register', validateUserRegister, userController.register);

module.exports = router;
