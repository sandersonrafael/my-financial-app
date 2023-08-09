import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .8);
  z-index: 4;

  &>div {
    padding: 25px;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    width: 100%;
    max-width: 260px;

    &>div {
      position: relative;
      p {
        position: absolute;
        display: inline-block;
        bottom: 5px;
        left: 0;
        right: 0;
      }

      input,
      select {
        margin-bottom: 25px;
        padding: 12px 15px;
        border-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
        background-color: transparent;
        cursor: text;
        width: 100%;
        max-width: calc(100% - 32px);
        font-size: 17px;
      }
      select {
        cursor: pointer;
        padding: 12px 15px;
        max-width: 100%;
        font-size: 17px;
      }
    }

    div:has(input + svg, select + svg) {
      position: relative;

      input {
        padding-right: 27px;
        width: calc(100% - 44px);
      }
      svg {
        background-color: white;
        cursor: pointer;
        position: absolute;
        color: #777;
        font-size: 24px;
        font-weight: 100;
        top: 11px;
        right: 3px;
      }
    }

    &>section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &>button {
        width: 48%;
      }
    }
  }
`;
