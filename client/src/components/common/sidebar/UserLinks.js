import React from 'react';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';
import Link from './Link';
import DashboardIcon from '@material-ui/icons/Dashboard';

const UserLinks = props =>
  <div>
    <Link 
      location={props.location}
      route={routes.dashboard}
      text="Nástenka"
      icon={<DashboardIcon />}
    />
  </div>;

UserLinks.propTypes = {
  location: propTypes.object.isRequired
}

export default UserLinks;