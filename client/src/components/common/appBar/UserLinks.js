import React from 'react';
import userPropTypes from './../../../propTypes/userPropTypes';
import routes from '../../../routes';
import { Button, Avatar, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/userActions';
import './Appbar.scss';

const UserLinks = props =>
    <Link className="link" to={routes.login}>
        <Tooltip title={props.user.email} placement="left">
            <Button>
                <Avatar onClick={props.logout}>
                    {props.user.email.charAt(0)}
                </Avatar>
            </Button>
        </Tooltip>
    </Link>

UserLinks.propTypes = {
    user: userPropTypes.user.isRequired
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

const mapStateToProps = state => {
    return {
        user: {
            id: state.firebase.auth.uid,
            email: state.firebase.auth.email
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLinks);