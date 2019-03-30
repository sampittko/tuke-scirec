import PropTypes from 'prop-types';

const propTypes = {
  projectVersion: PropTypes.shape({
    project: PropTypes.object.isRequired,
    notes: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date),
    modified: PropTypes.instanceOf(Date),
    projectNum: PropTypes.number.isRequired,
    state: PropTypes.number.isRequired,
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

export default propTypes;