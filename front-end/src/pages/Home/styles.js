import styled from 'styled-components';
import { primaryGradient } from '../../colors/colors';

export const Container = styled.div`

`;

export const BackgroundTop = styled.div`
  background-image: ${primaryGradient};
  width: 100vw;

  h1 {
    text-align: center;
    padding: 30px 10px 120px;
    color: #eee;
    font-weight: 600;
    font-size: 36px;
  }
`;

export const Main = styled.main`
  margin: -100px auto 30px;
  width: 94%;
  max-width: 540px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, .15);

  h2 {
    text-align: center;
    font-weight: 600;
    color: #444;
    padding: 15px 10px
  }
`;
