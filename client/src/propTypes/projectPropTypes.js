import PropTypes from 'prop-types';

const propTypes = {
  project: PropTypes.shape({
    dashboard: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date),
    modified: PropTypes.instanceOf(Date),
    route: PropTypes.string.isRequired,
    state: PropTypes.number.isRequired,
    deadline: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    recipient: PropTypes.string.isRequired,
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

export default propTypes;