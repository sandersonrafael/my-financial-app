import styled from 'styled-components';

export const Form = styled.div`
  margin: 0 10px 30px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-weight: 400;
    font-size: 19px;
    padding: 15px;
  }

  input {
    display: inline-block;
    padding: 15px;
    margin: 2.5px auto;
    border-radius: 5px;
    width: calc(100% - 30px);
    max-width: 300px;
    outline: none;
    border: 1px solid #ddd;
  }

  div {
    width: 100%;
    max-width: 300px;
    display: flex;
    justify-content: center;
  }
  button {
    margin: 10px 5px 0;
  }
`;
