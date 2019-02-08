import PropTypes from 'prop-types';

const propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    })
}

export default propTypes;