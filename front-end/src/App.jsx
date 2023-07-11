import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [guest, setGuest] = useState(false);
  // aviso através de cookies que usuário convidado não possui seus dados salvos

  return !(loggedIn || guest) ? (
    <Login setLoggedIn={setLoggedIn} setGuest={setGuest} />
  ) : (
    <Home />
  );
}
