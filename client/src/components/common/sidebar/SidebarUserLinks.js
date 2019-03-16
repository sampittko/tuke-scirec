import { getDashboardRoute, getDashboardSettingsRoute } from '../../../utils/dashboardUtils';

import DashboardIcon from '@material-ui/icons/Dashboard';
import { Divider } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Link from './SidebarLink';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';

const UserLinks = props =>
  <div>
    <Link
      location={props.location}
      route={getDashboardRoute(props.activeDashboardRoute)}
      text={props.activeDashboardTitle}
      icon={<DashboardIcon />}
    />
    <Link
      location={props.location}
      route={getDashboardSettingsRoute(props.activeDashboardRoute)}
      text="Nastavenia"
      icon={<SettingsIcon />}
    />
    <Divider />
    <Link
      location={props.location}
      route={routes.ABOUT}
      text="O aplikácii"
      icon={<InfoIcon />}
    />
  </div>;

UserLinks.propTypes = {
  location: propTypes.object.isRequired,
  activeDashboardRoute: propTypes.string.isRequired,
  activeDashboardTitle: propTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    activeDashboardTitle: state.dashboard.selector.active.data().title || "Nástenka",
    activeDashboardRoute: state.dashboard.selector.activeRoute || "",
  }
}

export default connect(mapStateToProps)(UserLinks);