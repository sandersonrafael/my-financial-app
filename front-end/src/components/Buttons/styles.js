import { primaryColor } from '../../colors/colors';
import styled from 'styled-components';

export const PrimaryButton = styled.button`
  padding: 13px 15px;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: ${primaryColor};
  cursor: pointer;
  color: #fff;
  border-radius: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

export const SecondaryButton = styled.button`
  padding: 12px 14px;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: #fff;
  cursor: pointer;
  color: #333;
  border-radius: 4px;
  font-weight: 400;
  border: 1px solid #333;

  &:hover {
    background-color: ${primaryColor + 'a9'};
    color: #fff;
    border: 1px solid ${primaryColor + 'a9'};
  }
`;
