import {getDashboardRoute, getDashboardSettingsRoute} from '../../../utils/dashboardUtils';

import DashboardIcon from '@material-ui/icons/Dashboard';
import {Divider} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Link from './Link';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import ArchiveIcon from '@material-ui/icons/Archive';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';
import {getProjectRoute, getProjectsArchiveRoute, getProjectSettingsRoute} from "../../../utils/projectUtils";

const UserLinks = props =>
  <div>
    <Link
      location={props.location}
      route={getDashboardRoute(props.activeDashboardRoute)}
      text={props.activeDashboardTitle}
      icon={<DashboardIcon/>}
    >
      {props.activeProject && (
        <div>
          <Link
            location={props.location}
            route={getProjectRoute(props.activeDashboardRoute, props.activeProject.data().route)}
            text={props.activeProject.data().title}
            icon={<CollectionsBookmarkIcon/>}
          />
          <Link
            location={props.location}
            route={getProjectSettingsRoute(props.activeDashboardRoute, props.activeProject.data().route)}
            text="Nastavenia projektu"
            icon={<SettingsIcon/>}
          />
        </div>
      )}
    </Link>
    <Link
      location={props.location}
      route={getProjectsArchiveRoute(props.activeDashboardRoute)}
      text="Archív projektov"
      icon={<ArchiveIcon/>}
    />
    <Link
      location={props.location}
      route={getDashboardSettingsRoute(props.activeDashboardRoute)}
      text="Nastavenia nástenky"
      icon={<SettingsIcon/>}
    />
    <Divider/>
    <Link
      location={props.location}
      route={routes.ABOUT}
      text="O aplikácii"
      icon={<InfoIcon/>}
    />
  </div>;

UserLinks.propTypes = {
  location: propTypes.object.isRequired,
  activeDashboardRoute: propTypes.string.isRequired,
  activeDashboardTitle: propTypes.string.isRequired,
  activeProject: propTypes.object,
};

const mapStateToProps = state => {
  return {
    activeDashboardTitle: state.dashboard.selector.active.data().title || "Nástenka",
    activeDashboardRoute: state.dashboard.selector.activeRoute || "",
    activeProject: state.project.data.active,
  }
};

export default connect(mapStateToProps)(UserLinks);