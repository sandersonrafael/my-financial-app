import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom';
import { userAccess } from './db/dataProcess';

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [guest, setGuest] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const checkLogin = async () => {
      const loggedUser = await userAccess();
      setLoggedIn(!!loggedUser);
      setUserData(loggedUser || {});
    };
    checkLogin();
  }, []);

  return !(loggedIn || guest) ? (
    <Login setLoggedIn={setLoggedIn} setGuest={setGuest} />
  ) : (
    <BrowserRouter>
      <Home loggedIn={loggedIn} userData={userData} />
    </BrowserRouter>
  );
}
