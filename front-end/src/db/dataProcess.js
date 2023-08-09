import { validateLogin, validateRegister, validateAttUserData } from '../utils/validation';
import mongoDB from './mongoDB';
import { updateReportsOnStorage } from './localStorage';

const getIdAndToken = () => localStorage.getItem('userAccess')?.split(' ') || ['', ''];

const saveUserAccess = (id, token, email, name) => localStorage.setItem(
  'userAccess', `${id} ${token} ${email} ${name}`,
);

const attExpensesStorage = (dbResponse) => {
  const { fullReport } = dbResponse;
  if (fullReport) updateReportsOnStorage(fullReport);
};

export const userLogin = async (email, password) => {
  let errors = validateLogin(email, password);

  if (!errors) {
    const loginReturn = await mongoDB.userLogin(email, password);
    if (loginReturn.id) {
      const { id, name, email, token } = loginReturn;

      saveUserAccess(id, token, email, name);
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

      saveUserAccess(id, token, email, name);
      return { id, name, email, token };
    }
    else errors = registerReturn;
  }

  return errors;
};

export const userAccess = async () => {
  const [id, token] = getIdAndToken();

  return id
    ? await mongoDB.userAccess(id, token)
    : false;
};

export const attUserData = async (
  name,
  email,
  password,
  newPassword,
  repeatNewPassword,
  editingPassword,
) => {
  const [ id, token ] = getIdAndToken();
  const errors = validateAttUserData(name, email, password, newPassword, repeatNewPassword) || {};

  if (editingPassword) delete errors.emailMsgs && delete errors.nameMsgs ;
  else delete errors.newPasswordMsgs && delete errors.repeatNewPasswordMsgs;

  for (let key in errors) if (errors[key].length > 0) return errors // eslint-disable-line

  delete errors.passwordMsgs;

  const attUserDataReturn = await mongoDB.attUserData(
    id, token, name, email, password, newPassword, repeatNewPassword,
  );
  saveUserAccess(id, token, email, name);

  return attUserDataReturn;
};

export const loadExpenses = async () => {
  const [id, token] = getIdAndToken();
  const fullReport = localStorage.getItem('userExpenses');
  if (fullReport) return { fullReport: JSON.parse(fullReport) };

  const dbResponse = await mongoDB.loadExpenses(id, token);
  attExpensesStorage(dbResponse);

  return dbResponse;
};

export const addExpense = async (fullDate, nexExpense) => {
  const [id, token] = getIdAndToken();
  const dbResponse = await mongoDB.addExpense(id, token, fullDate, nexExpense);
  attExpensesStorage(dbResponse);

  return dbResponse;
};

export const updateExpense = async (fullDate, newExpense, index) => {
  const [id, token] = getIdAndToken();
  const dbResponse = await mongoDB.updateExpense(id, token, fullDate, newExpense, index);
  attExpensesStorage(dbResponse);

  return dbResponse;
};

export const deleteExpense = async (fullDate, index, deleteMonth, deleteYear) => {
  const [id, token] = getIdAndToken();
  const dbResponse = await mongoDB.deleteExpense(
    id, token, fullDate, index, deleteMonth, deleteYear,
  );
  attExpensesStorage(dbResponse);

  return dbResponse;
};
