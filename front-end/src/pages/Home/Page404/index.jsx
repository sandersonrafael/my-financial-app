import { Link } from 'react-router-dom';

import { H2, P } from './styles';

export default function Page404() {
  return (
    <>
      <H2>Erro 404</H2>
      <P>A página que você procura não existe ou foi removida.</P>
      <P>Volte ao <Link to="/">Início</Link>.</P>
    </>
  );
}
