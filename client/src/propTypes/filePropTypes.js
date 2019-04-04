import PropTypes from 'prop-types';

const propTypes = {
  projectVersionReview: PropTypes.shape({
    belongsTo: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

export default propTypes;