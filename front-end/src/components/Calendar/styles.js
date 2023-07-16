import styled from 'styled-components';

export const Container = styled.div`
  user-select: none;
  width: 270px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 7px 3px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

export const MonthsFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  * {
    margin: 10px;
    font-weight: 400;
    font-size: 20px;
  }

  svg {
    color: ${({ $primaryColor }) => $primaryColor ?? '#119edf'};
    cursor: pointer;
  }
`;

export const DaysGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  * {
    width: 38px;
    height: 38px;
    text-align: center;
    margin: 0 auto;
  }
`;

export const Button = styled.button`
  border-radius: 50%;
  outline: none;
  background-color: ${({ selected, $primaryColor }) =>
    selected ? $primaryColor ?? '#119edf' : 'transparent'};
  color: ${({ selected, $dateIsGray }) =>
    selected ? '#fff' : $dateIsGray ? '#ccc' : '#000'};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ $primaryColor }) => $primaryColor ?? '#119edf'};
    color: #fff;
  }
`;
