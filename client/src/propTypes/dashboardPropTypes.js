import PropTypes from 'prop-types';

const propTypes = {
  dashboard: PropTypes.shape({
    user: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.number.isRequired,
    created: PropTypes.instanceOf(Date).isRequired
  }),
}

export default propTypes;