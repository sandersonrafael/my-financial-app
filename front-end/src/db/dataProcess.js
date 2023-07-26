import { validateLogin, validateRegister } from '../utils/validation';
import mongoDB from './mongoDB';

const getIdAndToken = () => localStorage.getItem('userAccess')?.split(' ') || ['', ''];

const saveUserAccess = (id, token, name) => localStorage.setItem(
  'userAccess', `${id} ${token} ${name}`,
);

export const userLogin = async (email, password) => {
  let errors = validateLogin(email, password);

  if (!errors) {
    const loginReturn = await mongoDB.userLogin(email, password);
    if (loginReturn.id) {
      const { id, name, email, token } = loginReturn;

      saveUserAccess(id, token, name);
      return { id, name, email, token };
    } else errors = loginReturn;
  }

  return errors;
};

export const userRegister = async (name, email, password, repeatPassword) => {
  let errors = validateRegister(name, email, password, repeatPassword);

  if (!errors) {
    const registerReturn = await mongoDB.userRegister(name, email, password, repeatPassword);
    if (registerReturn.id) {
      const { id, name, email, token } = registerReturn;

      saveUserAccess(id, token, name);
      return { id, name, email, token };
    }
    else errors = registerReturn;
  }

  return errors;
};

export const userAccess = async () => {
  const idAndToken = localStorage.getItem('userAccess')?.split(' ');

  return idAndToken
    ? await mongoDB.userAccess(idAndToken[0], idAndToken[1])
    : false;
};

export const loadExpenses = async () => {
  const [id, token] = getIdAndToken();
  return await mongoDB.loadExpenses(id, token);
};

export const addExpense = async (fullDate, nexExpense) => {
  const [id, token] = getIdAndToken();
  return await mongoDB.addExpense(id, token, fullDate, nexExpense);
};

export const updateExpense = async (fullDate, newExpense, index) => {
  const [id, token] = getIdAndToken();
  return await mongoDB.updateExpense(id, token, fullDate, newExpense, index);
};

export const deleteExpense = async (fullDate, index) => {
  const [id, token] = getIdAndToken();
  return await mongoDB.deleteExpense(id, token, fullDate, index);
};
