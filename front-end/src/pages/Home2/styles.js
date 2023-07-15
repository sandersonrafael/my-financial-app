import styled from 'styled-components';
import { primaryGradient, primaryColor } from '../../colors/colors';

export const Container = styled.div``;

export const BackgroundTop = styled.div`
  background-image: ${primaryGradient};
  width: 100%;

  &>h1 {
    text-align: center;
    padding: 30px 10px 150px;
    color: #fff;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }
`;

export const DateSelector = styled.div`
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  max-width: 540px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, .15);

  &>h2 {
    text-align: center;
    font-weight: 600;
    color: #444;
    padding: 15px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      opacity: .8;
      text-decoration: underline;
    }

    svg {
      color: ${primaryColor};
      font-size: 24px;
      margin-left: 10px;
    }
  }
`;

export const Main = styled.main`
  margin: 10px auto;
  width: calc(100% - 60px);
  padding: 15px;
  border-radius: 16px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, .2);

  header {
    text-align: center;

    h1 {
      font-weight: 500;
      padding: 12px;
      line-height: 32px;
    }
  }
`;
