import React from 'react';
import PropTypes from 'prop-types';
import routes from '../../../routes';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './AppBar.scss';
import { connect } from 'react-redux';
import { logout } from '../../../actions/userActions';

const UserLinks = props =>
    <Link className="link" to={routes.login}>
        <Button onClick={props.logout} color="inherit">
            Odhlásiť
        </Button>
    </Link>

UserLinks.propTypes = {
    logout: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(UserLinks);