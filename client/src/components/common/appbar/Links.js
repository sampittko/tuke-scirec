import React from 'react';
import propTypes from 'prop-types';
import routes from '../../../routes';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Appbar.scss';

const Links = props =>
  <div>
    {props.location.pathname === routes.user.login ? (
      <Link className="link" to={routes.user.register}>
        <Button color="inherit">
            Registrácia
          </Button>
      </Link>
    ) : (
        <Link className="link" to={routes.user.login}>
          <Button color="inherit">
            Prihlásenie
          </Button>
        </Link>
      )}
  </div>;

Links.propTypes = {
  location: propTypes.object.isRequired
}

export default Links;