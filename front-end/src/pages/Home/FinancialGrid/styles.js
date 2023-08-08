import styled from 'styled-components';

export const NoExpenses = styled.div`
  padding: 15px;

  h3 {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
  }
`;

export const Container = styled.div`
  width: calc(100% - 30);
  padding: 15px;
  font-size: 17px;
  font-weight: 500;
  overflow-x: auto;

  * {
    padding: 1.5px 5px;
  }

  &>div,
  &>header,
  &>footer {
    display: grid;
    grid-template-columns: 1.6fr 1.2fr .7fr .5fr;
    text-align: center;

  }
  &>footer {
    border-top: 1px solid #ccc;
    &>h3 {
      padding: 15px 5px 0;
    }
  }

  div>h3,
  header>h3 {
    font-weight: 600;
    font-size: 20px;
    padding: 0 5px 15px;
  }

  svg {
    cursor: pointer;
    font-size: 24px;
    padding: 0;
    margin: 0 5px;

    &:hover {
      opacity: .7;
    }
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 450px) {
    padding: 5px;


    &>div,
    &>header,
    &>footer {
      &:first-child {
      display: none;
    }
      border-radius: 8px;
      padding: 5px;
      display: block;
      border: 1px solid #ccc;
      margin: 5px;
      position: relative;

      span:last-child,
      h3:last-child  {
        position: absolute;
        bottom: -3px;
        right: -5px;
        white-space: nowrap;
      }
      h3 {
        padding: 5px;
      }
    }
  }
`;
