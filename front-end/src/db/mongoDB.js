const host = import.meta.env.VITE_API_HOST;

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
      return { message: 'Erro durante a operação.', error };
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
};

export default mongoDB;
