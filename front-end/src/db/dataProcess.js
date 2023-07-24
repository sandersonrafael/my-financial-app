import { validateLogin, validateRegister } from '../utils/validation';
import mongoDB from './mongoDB';

const saveUserAccess = (id, token) => localStorage.setItem('userAccess', `${id} ${token}`);

export const userLogin = async (email, password) => {
  let errors = validateLogin(email, password);

  if (!errors) {
    const loginReturn = await mongoDB.userLogin(email, password);
    if (loginReturn.id) {
      const { id, name, email, token } = loginReturn;

      saveUserAccess(id, token);
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

      saveUserAccess(id, token);
      return { id, name, email, token };
    }
    else errors = registerReturn;
  }

  return errors;
};

export const userAccess = async () => {
  const idAndToken = localStorage.getItem('userAccess')?.split(' ');

  return idAndToken
    ? mongoDB.userAccess(idAndToken[0], idAndToken[1])
    : false;
};
