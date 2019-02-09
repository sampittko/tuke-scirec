import PropTypes from 'prop-types';

const propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }),
}

export default propTypes;