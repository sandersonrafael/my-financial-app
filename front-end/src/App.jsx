import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [guest, setGuest] = useState(false);

  return !(loggedIn || guest) ? (
    <Login setLoggedIn={setLoggedIn} setGuest={setGuest} />
  ) : (
    <Home />
  );
}
