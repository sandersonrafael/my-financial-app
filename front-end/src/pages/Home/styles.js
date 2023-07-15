import styled from 'styled-components';
import { primaryColor, primaryGradient } from '../../colors/colors';

export const Container = styled.div`
  min-height: 100vh;
`;

export const Header = styled.header`
    width: calc(100% - 20px);
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, .1);
    border-bottom: 1px solid #ccc;

    &>div {
    margin: 0 auto;
    height: 100%;
    max-width: 980px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &>a {
      display: flex;
      align-items: center;
      height: 100%;
      word-spacing: nowrap;

      img {
        max-height: 50px;
      }
    }

    div {
      a {
        background-color: ${primaryColor};
        padding: 10px 15px;
        border-radius: 4px;
        margin: 0 5px;
        color: #fff;
        font-weight: 500;
        font-size: 16px;

        &:hover {
          opacity: .8;
          box-shadow: 0 0 5px 2px rgba(0, 0, 0, .15);
        }
      }
    }
  }
`;

export const Body = styled.div``;

export const BodyTop = styled.div`
  width: 100%;
  background-image: ${primaryGradient};

  h1 {
    text-align: center;
    color: #fff;
    padding: 30px 10px 130px;
  }
`;

export const BodyMain = styled.main`
  margin: -100px auto 0;
  max-width: 940px;
  background-color: #fff;
  box-shadow: 0 0 10px 5px ${primaryColor}22 /* rgba(0, 0, 0, .15) */;
  border-radius: 8px;
  border: 1px solid #eee;

  h2 {
    text-align: center;
    padding: 20px 10px;
    font-weight: 500;
  }
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-image: ${primaryGradient};
  padding: 10px 0;
  color: #fff;
  text-align: center;
  font-size: 17px;

  a {
    display: inline-block;
    margin-left: 7px;
    font-weight: bold;
    color: #fff;
    font-size: 18px;
    text-decoration: underline;

    &:hover {
      scale: 1.05;
      transition: all .3s ease;
    }
  }
`;
