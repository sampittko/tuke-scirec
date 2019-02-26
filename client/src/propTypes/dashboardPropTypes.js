import PropTypes from 'prop-types';

const propTypes = {
  dashboard: PropTypes.shape({
    user: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.number.isRequired,
    created: PropTypes.number.isRequired
  }),
}

export default propTypes;