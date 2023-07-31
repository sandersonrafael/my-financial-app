const express = require('express');
const router = express.Router();

const validateUserRegister = require('./middlewares/validateUserRegister');
const validateUserLogin = require('./middlewares/validateUserLogin');
const validateUserToken = require('./middlewares/validateUserToken');
const validateAttUserInfos = require('./middlewares/validateAttUserInfo');
const validateExpenseCreate = require('./middlewares/validateExpenseCreate');
const validateExpenseDelete = require('./middlewares/validateExpenseDelete');
const validateDate = require('./middlewares/validateDate');

const { login, register, access, attUserData } = require('./controllers/userController');
const { createOrUpdate, list, deleteExpenses } = require('./controllers/expensesController');

router.post('/login', validateUserLogin, login);
router.post('/register', validateUserRegister, register);
router.get('/users/:id', validateUserToken, access);
router.put('/users/:id', validateUserToken, validateAttUserInfos, attUserData);

router.get('/user/expenses/:id', validateUserToken, list);
router.post(
  '/user/expenses/:id', validateUserToken, validateExpenseCreate, validateDate, createOrUpdate,
);
router.put(
  '/user/expenses/:id', validateUserToken, validateExpenseCreate, validateDate, createOrUpdate,
);
router.delete(
  '/user/expenses/:id', validateUserToken, validateExpenseDelete, validateDate, deleteExpenses,
);

module.exports = router;
