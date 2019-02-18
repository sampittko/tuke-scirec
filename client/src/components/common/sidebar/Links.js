import React from 'react';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Link from './Link';

const Links = props =>
  <div>
    <Link
      location={props.location}
      route={routes.user.login}
      text="Prihlásenie"
      icon={<PersonIcon />}
    />
    <Link
      location={props.location}
      route={routes.user.register}
      text="Registrácia"
      icon={<PersonAddIcon />}
    />
  </div>;

Links.propTypes = {
  location: propTypes.object.isRequired
}

export default Links;