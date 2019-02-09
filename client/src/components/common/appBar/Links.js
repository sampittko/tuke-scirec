import React from 'react';
import PropTypes from 'prop-types';
import routes from '../../../routes';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Appbar.scss';

const Links = props =>
    <div>
        {props.registerPage ? (
            <Link className="link" to={routes.login}>
                <Button onClick={props.onClick} color="inherit">
                    Prihlásenie
                </Button>
            </Link>
        ) : (
            <Link className="link" to={routes.register}>
                <Button onClick={props.onClick} color="inherit">
                    Registrácia
                </Button>
            </Link>
            )
        }
    </div>;

Links.propTypes = {
    onClick: PropTypes.func.isRequired,
    registerPage: PropTypes.bool.isRequired
}

export default Links;