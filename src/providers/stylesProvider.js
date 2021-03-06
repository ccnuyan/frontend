import { PropTypes } from 'prop-types';
import createProvider from './reactProvideProps';

import styles from './styles';

export default createProvider('StylesProvider`', () => ({
  ...styles,
}), {
  styles: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
});
