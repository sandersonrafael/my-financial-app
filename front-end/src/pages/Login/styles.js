import { primaryColor, primaryGradient } from '../../colors/colors';
import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 15px;

  background-image: ${primaryGradient};

  font-size: 17;
  font-weight: 400;

  z-index: 3;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: calc(100% - 20px);
  height: fit-content;
  max-width: 380px;
  border-radius: 12px;
  padding: 0 10px;
  box-shadow: 0 0 7px rgba(0, 0, 0, .3);

  form {
    input {
      width: calc(100% - 112px);
    }

    p {
      display: block;
      margin: 0 auto;
      width: 300px;
    }
  }
  button {
    width: calc(100% - 80px);
    margin: 10px 40px 15px;
  }

  @media (max-width: 400px) {
    form {
      input {
        width: calc(100% - 52px);
      }

      p {
        width: calc(100% - 52px);
        font-size: 14px;
      }
    }
    button {
      width: calc(100% - 20px);
      margin: 10px 10px 15px;
    }
  }
`;

export const MainHeader = styled.h1`
  display: block;
  text-align: center;
  padding: 10px 0 0;
  font-weight: 600;
`;

export const P = styled.p`
  font-size: 17px;
  text-align: center;

  span {
    color: ${primaryColor};
    font-weight: 500;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Input = styled.input`
  margin: 10px 40px 0;
  padding: 13px 15px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    box-shadow: 0 0 10px 2px ${primaryColor + '55'};
  }

  @media (max-width: 400px) {
    margin: 10px 10px 0;
  }
`;

export const AskCamp = styled.div`
  * {
    display: inline-block;
    color: rgb(13, 114, 177);
    font-weight: 600;
    margin: 7px 0 14px 32px;
    border-radius: 10px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Spacing = styled.p`
  margin-bottom: 20px;
`;
