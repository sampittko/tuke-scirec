import React from 'react';
import propTypes from 'prop-types';
import userPropTypes from '../../../propTypes/userPropTypes';
import routes from '../../../routes';
import { Button, Avatar, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Appbar.scss';

const UserLinks = props =>
    <Link className="link" to={routes.user.login}>
        <Tooltip
            title={props.user.email}
            placement="left"
            onClick={props.logout}
        >
            <Button>
                <Avatar>
                    {props.user.email.charAt(0)}
                </Avatar>
            </Button>
        </Tooltip>
    </Link>;

UserLinks.propTypes = {
    logout: propTypes.func.isRequired,
    user: userPropTypes.user.isRequired
}

export default UserLinks;