import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [guest, setGuest] = useState(false);
  console.log('remover o true do guest');
  console.log('adicionar informação de userName com useEffect, buscando no storage ou db');

  return !(loggedIn || guest) ? (
    <Login setLoggedIn={setLoggedIn} setGuest={setGuest} />
  ) : (
    <BrowserRouter>
      <Home loggedIn={loggedIn} />
    </BrowserRouter>
  );
}
