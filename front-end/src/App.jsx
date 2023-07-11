import { useEffect, useState } from 'react';
import Login from './pages/Login';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginPage, setLoginPage] = useState(true);

  useEffect(() => setLoginPage(!loggedIn), [loggedIn]);

  return (
    <Login setLoggedIn={setLoggedIn} />
  );
}
