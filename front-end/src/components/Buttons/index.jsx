import PropTypes from 'prop-types';
import * as Styled from './styles';

export const PrimaryButton = ({ children, style }) => (
  <Styled.PrimaryButton style={style}>
    {children}
  </Styled.PrimaryButton>
);

export const SecondaryButton = ({ children, style }) => (
  <Styled.SecondaryButton style={style}>
    {children}
  </Styled.SecondaryButton>
);

PrimaryButton.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

SecondaryButton.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};
