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
`;

export const ReportGrid = styled.div`
  width: calc(100% - 30);
  padding: 5px 0;
  font-size: 17px;
  font-weight: 400;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;

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
