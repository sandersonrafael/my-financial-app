import PropTypes from 'prop-types';
import { ImSpinner10 } from 'react-icons/im';

import { Spinner } from './styles';

export default function Loading({ $sz, $cl, style }) {
  return (
    <Spinner $sz={$sz} $cl={$cl} style={style}>
      <ImSpinner10 />
    </Spinner>
  );
}

Loading.propTypes = {
  $sz: PropTypes.number,
  $cl: PropTypes.string,
  style: PropTypes.objectOf(
    PropTypes.any,
  ),
};
