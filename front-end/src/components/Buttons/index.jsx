import PropTypes from 'prop-types';
import * as Styled from './styles';

export const PrimaryButton = ({ children, style, onClick }) => (
  <Styled.PrimaryButton style={style} onClick={onClick}>
    {children}
  </Styled.PrimaryButton>
);

export const SecondaryButton = ({ children, style, onClick }) => (
  <Styled.SecondaryButton style={style} onClick={onClick}>
    {children}
  </Styled.SecondaryButton>
);

PrimaryButton.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

SecondaryButton.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
