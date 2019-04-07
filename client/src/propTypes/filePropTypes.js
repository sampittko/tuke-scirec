import PropTypes from 'prop-types';

const propTypes = {
  projectVersionReview: PropTypes.shape({
    belongsTo: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

export default propTypes;