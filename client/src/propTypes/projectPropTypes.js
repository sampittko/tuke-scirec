import PropTypes from 'prop-types';

const propTypes = {
  project: PropTypes.shape({
    dashboard: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date),
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
}

export default propTypes;