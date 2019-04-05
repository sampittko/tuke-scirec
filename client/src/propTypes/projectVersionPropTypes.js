import PropTypes from 'prop-types';

const propTypes = {
  projectVersion: PropTypes.shape({
    project: PropTypes.object.isRequired,
    notes: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    modified: PropTypes.instanceOf(Date).isRequired,
    projectNum: PropTypes.number.isRequired,
    state: PropTypes.number.isRequired,
  }),
  isUpdating: PropTypes.bool,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

export default propTypes;