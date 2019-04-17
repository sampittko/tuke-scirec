import './index.scss';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import React from 'react';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';
import AccountArrowRightIcon from 'mdi-material-ui/AccountArrowRight';
import AccountPlusIcon from 'mdi-material-ui/AccountPlus';

const Links = props =>
  <div>
    {props.location.pathname === routes.LOGIN ? (
      <Link className="link" to={routes.REGISTER}>
        <Button variant="outlined" color="inherit">
          <AccountPlusIcon className="icon"/>
          Registrácia
        </Button>
      </Link>
    ) : (
      <Link className="link" to={routes.LOGIN}>
        <Button variant="outlined" color="inherit">
          <AccountArrowRightIcon className="icon"/>
          Prihlásenie
        </Button>
      </Link>
    )}
  </div>;

Links.propTypes = {
  location: propTypes.object.isRequired
};

export default Links;