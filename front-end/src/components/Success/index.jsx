import PropTypes from 'prop-types';

import { PSuccess } from './styles';

export default function Success({ children }) {
  return <PSuccess>{children}</PSuccess>;
}

Success.propTypes = {
  children: PropTypes.node,
};
