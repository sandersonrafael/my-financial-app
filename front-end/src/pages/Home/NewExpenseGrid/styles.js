import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .9);

  &>div {
    padding: 25px;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;

    div {
      & > * {
        padding: 5px 15px;
        margin: 0 5px;
      }

      display: grid;
      grid-template-columns: repeat(4, 1fr);

      input,
      select {
        border: none;
        outline: none;
        border-bottom: 1px solid #000;
      }
    }

    section {
      button {
        margin: 25px 10px 0;
      }
    }
  }
`;
