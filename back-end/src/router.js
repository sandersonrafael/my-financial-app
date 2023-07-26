const express = require('express');
const router = express.Router();

const validateUserRegister = require('./middlewares/validateUserRegister');
const validateUserLogin = require('./middlewares/validateUserLogin');
const validateUserToken = require('./middlewares/validateUserToken');
const validateExpenseCreate = require('./middlewares/validateExpenseCreate');
const validateExpenseDelete = require('./middlewares/validateExpenseDelete');
const userController = require('./controllers/userController');
const expensesController = require('./controllers/expensesController');

router.post('/login', validateUserLogin, userController.login);
router.post('/register', validateUserRegister, userController.register);
router.get('/users/:id', validateUserToken, userController.access);

router.get('/user/expenses/:id', validateUserToken, expensesController.list);
router.post(
  '/user/expenses/:id', validateUserToken, validateExpenseCreate, expensesController.createOrUpdate,
);
router.put(
  '/user/expenses/:id', validateUserToken, validateExpenseCreate, expensesController.createOrUpdate,
);
router.delete(
  '/user/expenses/:id', validateUserToken, validateExpenseDelete, expensesController.deleteExpenses,
);

module.exports = router;
