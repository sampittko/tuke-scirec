import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import Link from './SidebarLink';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';

const Links = props =>
  <div>
    <Link
      location={props.location}
      route={routes.HOME}
      text="Domov"
      icon={<HomeIcon />}
    />
    <Link
      location={props.location}
      route={routes.LOGIN}
      text="Prihlásenie"
      icon={<PersonIcon />}
    />
    <Link
      location={props.location}
      route={routes.REGISTER}
      text="Registrácia"
      icon={<PersonAddIcon />}
    />
    <Link
      location={props.location}
      route={routes.ABOUT}
      text="O aplikácii"
      icon={<InfoIcon />}
    />
  </div>;

Links.propTypes = {
  location: propTypes.object.isRequired
}

export default Links;