const express = require('express');
const router = express.Router();

const validateUserRegister = require('./middlewares/validateUserRegister');
const validateUserLogin = require('./middlewares/validateUserLogin');
const validateUserToken = require('./middlewares/validateUserToken');
const userController = require('./controllers/userController');
const expensesController = require('./controllers/expensesController');

router.post('/login', validateUserLogin, userController.login);
router.post('/register', validateUserRegister, userController.register);
router.get('/users/:id', validateUserToken, userController.access);

router.post('/user/expenses/:id', validateUserToken, expensesController.createOrUpdate);
router.put('/user/expenses/:id', validateUserToken, expensesController.createOrUpdate);

module.exports = router;
