import styled from 'styled-components';

export const Container = styled.div`
  width: calc(100% - 30);
  padding: 15px;
  font-size: 17px;

  * {
    padding: 1.5px 5px;
  }

  &>div {
    display: grid;
    grid-template-columns: 2fr 1fr .7fr .7fr;
    text-align: center;
  }

  h3 {
    font-weight: 600;
    font-size: 22px;
    padding: 0 5px 15px
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
`;
