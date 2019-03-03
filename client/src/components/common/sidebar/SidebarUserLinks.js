import { getDashboardRoute, getDashboardSettingsRoute } from '../../../utils/dashboardUtils';

import DashboardIcon from '@material-ui/icons/Dashboard';
import { Divider } from '@material-ui/core';
import Link from './SidebarLink';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const UserLinks = props =>
  <div>
    <Link
      location={props.location}
      route={getDashboardRoute(props.activeDashboardRoute)}
      text={props.activeDashboardTitle}
      icon={<DashboardIcon />}
    />
    <Divider />
    <Link
      location={props.location}
      route={getDashboardSettingsRoute(props.activeDashboardRoute)}
      text="Nastavenia"
      icon={<SettingsIcon />}
    />
  </div>;

UserLinks.propTypes = {
  location: propTypes.object.isRequired,
  activeDashboardRoute: propTypes.string.isRequired,
  activeDashboardTitle: propTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    activeDashboardTitle: state.dashboard.selector.active.title || "Nástenka",
    activeDashboardRoute: state.dashboard.selector.activeRoute || "",
  }
}

export default connect(mapStateToProps)(UserLinks);