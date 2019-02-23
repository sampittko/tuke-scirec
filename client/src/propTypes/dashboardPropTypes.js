import PropTypes from 'prop-types';

const propTypes = {
  category: PropTypes.shape({
    user: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.number.isRequired,
    default: PropTypes.bool.isRequired,
    created: PropTypes.instanceOf(Date).isRequired
  }),
}

export default propTypes;