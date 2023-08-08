import styled from 'styled-components';

export const NoExpenses = styled.div`
  padding: 15px;
  h3 {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
  }
`;

export const EmphasisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
  border-top: 1px solid #ccc;

  h3 {
    font-size: 20px;
    font-weight: 600;
    padding: 15px 0;
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

  @media (max-width: 668px) {
    &:has(~div>h3) {
      display: none;
    }

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    h3 {
      display: none;
    }

    h3:first-child,
    h3:last-child {
      display: block;
    }


  }
`;

export const ReportGrid = styled.div`
  width: calc(100% - 30);
  padding: 5px 0;
  font-size: 17px;
  font-weight: 400;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;

  span {
    span {
      display: none;
    }
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

  @media (max-width: 668px) {
    padding: 0;
    position: relative;
    display: block;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 10px;

    &>span {
      white-space: nowrap;
      display: inline-block;
      margin: 8px auto;
      width: 33%;

      span {
        display: block;
      }

      &:first-child {
        width: 100%;
      }

      &:last-child {
        margin: 0;
        width: auto;
        position: absolute;
        top: 5px;
        right: 0;
      }
    }
  }
`;

export const Select = styled.select`
  padding: 13px 15px;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #ccc;
  outline: none;

  border: 1px solid #ddd;
  font-size: 17px;
  border-radius: 8px;
  padding: 12px;
  &:active {
    box-shadow: 0 0 10px 3px #119edf33;
  }
`;
