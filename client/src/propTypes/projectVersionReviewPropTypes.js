import PropTypes from 'prop-types';

const propTypes = {
  projectVersionReview: PropTypes.shape({
    projectVersion: PropTypes.object.isRequired,
    notes: PropTypes.string.isRequired,
    reviewer: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    modified: PropTypes.instanceOf(Date).isRequired,
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

export default propTypes;