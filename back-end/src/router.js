const express = require('express');
const router = express.Router();

const validateUserRegister = require('./middlewares/validateUserRegister');
const validateUserLogin = require('./middlewares/validateUserLogin');
const validateUserToken = require('./middlewares/validateUserToken');
const userController = require('./controllers/userController');

router.post('/login', validateUserLogin, userController.login);
router.post('/register', validateUserRegister, userController.register);
router.get('/users/:id', validateUserToken, userController.access);

module.exports = router;
