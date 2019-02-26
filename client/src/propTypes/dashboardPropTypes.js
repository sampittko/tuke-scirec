import PropTypes from 'prop-types';

const propTypes = {
  dashboard: PropTypes.shape({
    user: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    theme: PropTypes.shape({
      id: PropTypes.number.isRequired,
      inverted: PropTypes.bool.isRequired
    }),
    created: PropTypes.number.isRequired
  })
}

export default propTypes;