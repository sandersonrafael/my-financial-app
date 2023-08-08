import styled from 'styled-components';

export const Spinner = styled.div`
  svg {
    width: ${({ $sz }) => $sz ?? 90}px;
    height: ${({ $sz }) => $sz ?? 90 }px;
    border-radius: ${({ $sz }) => $sz/2 ?? 45 }px;
    background-color: transparent;
    animation: spin 1.4s ease-in-out infinite;
    font-size: ${({ $sz }) => $sz ?? 90}px;
    color: ${({ $cl }) => $cl ?? 'white'};
  }

  @keyframes spin {
    0% {
      rotate: 0deg;
    }
    100% {
      rotate: 360deg;
    }
  }
`;
