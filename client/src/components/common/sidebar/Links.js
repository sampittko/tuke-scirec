import {Divider} from '@material-ui/core';
import HomeIcon from 'mdi-material-ui/Home';
import InformationIcon from 'mdi-material-ui/Information';
import Link from './Link';
import AccountPlusIcon from 'mdi-material-ui/AccountPlus';
import AccountIcon from 'mdi-material-ui/Account';
import React from 'react';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';

const Links = props =>
  <div>
    <Link
      location={props.location}
      route={routes.HOME}
      text="Úvodná stránka"
      icon={<HomeIcon/>}
    />
    <Link
      location={props.location}
      route={routes.LOGIN}
      text="Prihlásenie"
      icon={<AccountIcon/>}
    />
    <Link
      location={props.location}
      route={routes.REGISTER}
      text="Registrácia"
      icon={<AccountPlusIcon/>}
    />
    <Divider/>
    <Link
      location={props.location}
      route={routes.ABOUT}
      text="O aplikácii"
      icon={<InformationIcon/>}
    />
  </div>;

Links.propTypes = {
  location: propTypes.object.isRequired
};

export default Links;