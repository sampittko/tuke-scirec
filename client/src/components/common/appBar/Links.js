import React from 'react';
import routes from '../../../routes';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Appbar.scss';

const Links = props =>
    <div>
        <Link className="link" to={routes.login}>
            <Button color="inherit">
                Prihlásenie
            </Button>
        </Link>
        <Link className="link" to={routes.register}>
            <Button color="inherit">
                Registrácia
            </Button>
        </Link>
    </div>;

export default Links;