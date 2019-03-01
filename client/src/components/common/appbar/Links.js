import React from 'react';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Appbar.scss';

const Links = props =>
  <div>
    {props.location.pathname === routes.LOGIN ? (
      <Link className="link" to={routes.REGISTER}>
        <Button variant="outlined" color="inherit">
          Registrácia
        </Button>
      </Link>
    ) : (
        <Link className="link" to={routes.LOGIN}>
          <Button variant="outlined" color="inherit">
            Prihlásenie
          </Button>
        </Link>
      )}
  </div>;

Links.propTypes = {
  location: propTypes.object.isRequired
}

export default Links;