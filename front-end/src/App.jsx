import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { userAccess } from './db/dataProcess';
import DateProvider from './contexts/DateProvider';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const loggedUser = await userAccess();
      setLoading(false);
      setLoggedIn(!!loggedUser);
    };
    checkLogin();
  }, []);

  return !(loggedIn) ? (
    <Login setLoggedIn={setLoggedIn} loading={loading} />
  ) : (
    <DateProvider>
      <Home loggedIn={loggedIn} />
    </DateProvider>
  );
}
