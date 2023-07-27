import PropTypes from 'prop-types';

import { PError } from './styles';

export default function Error({ children }) {
  return <PError>{children}</PError>;
}

Error.propTypes = {
  children: PropTypes.node,
};
