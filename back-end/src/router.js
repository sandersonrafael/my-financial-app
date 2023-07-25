const express = require('express');
const router = express.Router();

const validateUserRegister = require('./middlewares/validateUserRegister');
const validateUserLogin = require('./middlewares/validateUserLogin');
const validateUserToken = require('./middlewares/validateUserToken');
const userController = require('./controllers/userController');

const ExpenseList = require('./models/ExpensesModel');

router.post('/login', validateUserLogin, userController.login);
router.post('/register', validateUserRegister, userController.register);
router.get('/users/:id', validateUserToken, userController.access);

router.post('user/expenses/:id', async (req, res) => {
  const { year, month, date } = req.body.fullDate;
  const { title, category, value, expense } = req.body.newExpense;

  const expenseList = new ExpenseList({
    year: {

    },
  });
});

module.exports = router;
