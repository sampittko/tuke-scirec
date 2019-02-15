import React from 'react';
import propTypes from 'prop-types';
import routes from '../../../routes';
import Link from './Link';
import DashboardIcon from '@material-ui/icons/Dashboard';

const UserLinks = props =>
  <div>
    <Link 
      location={props.location}
      route={routes.home}
      text="Prehľad"
      icon={<DashboardIcon />}
    />
  </div>;

UserLinks.propTypes = {
  location: propTypes.object.isRequired
}

export default UserLinks;