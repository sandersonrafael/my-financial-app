const host = import.meta.env.VITE_API_HOST;
console.log(
  'Ver a possbilidade de sincronizar sempre o ' +
  'localStorage e o DB ou remover completamente o localStorage',
);

const mongoDB = {
  userLogin: async (email, password) => {
    const body = { email, password };

    try {
      const res = await fetch(`${host}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const jsonResponse = await res.json();
      return jsonResponse;

    } catch (error) {
      return { message: 'Erro no servidor. Tente novamente mais tarde.', error };
    }
  },
  userRegister: async (name, email, password, repeatPassword) => {
    const body = { name, email, password, repeatPassword };

    try {
      const res = await fetch(`${host}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const jsonResponse = await res.json();
      return jsonResponse;

    } catch (error) {
      return { message: 'Falha no cadastro do usuário', error };
    }
  },
  userAccess: async (id, token) => {
    try {
      const res = await fetch(
        `${host}/users/${id}`, { method: 'GET', headers: { Authorization: `Bearer ${token}` } },
      );
      const jsonResponse = res.json();

      return jsonResponse;
    } catch(error) {
      return false;
    }
  },
};

export default mongoDB;