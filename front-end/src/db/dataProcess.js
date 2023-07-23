import { validateLogin, validateRegister } from '../utils/validation';
import mongoDB from './mongoDB';

export const userLogin = async (email, password) => {
  let errors = validateLogin(email, password);

  if (!errors) {
    const loginReturn = await mongoDB.userLogin(email, password);
    if (loginReturn.id && loginReturn.name && loginReturn.email) {
      const { id, name, email } = loginReturn;

      return { id, name, email };
    } else errors = loginReturn;
  }

  return errors;
};

export const userRegister = async (name, email, password, repeatPassword) => {
  let errors = validateRegister(name, email, password, repeatPassword);

  if (!errors) {
    const registerReturn = await mongoDB.userRegister(name, email, password, repeatPassword);
    if (registerReturn.id && registerReturn.name && registerReturn.email) {
      const { id, name, email } = registerReturn;

      return { id, name, email };
    }
    else errors = registerReturn;
  }

  return errors;
};

export const loadData = () => {};
