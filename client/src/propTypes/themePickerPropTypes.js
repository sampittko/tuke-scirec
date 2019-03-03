import PropTypes from 'prop-types';

const propTypes = {
  themePicker: PropTypes.shape({
    theme: PropTypes.number.isRequired,
    inverted: PropTypes.bool.isRequired,
  })
}

export default propTypes;