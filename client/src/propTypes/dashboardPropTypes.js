import PropTypes from 'prop-types';

const propTypes = {
  dashboard: PropTypes.shape({
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    theme: PropTypes.shape({
      id: PropTypes.number.isRequired,
      inverted: PropTypes.bool.isRequired,
    }),
    created: PropTypes.instanceOf(Date).isRequired,
  }),
  selector: PropTypes.shape({
    active: PropTypes.any,
    activeRoute: PropTypes.string,
    activeId: PropTypes.number,
    previousId: PropTypes.number,
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

export default propTypes;