import {getDashboardRoute, getDashboardSettingsRoute} from '../../../utils/dashboardUtils';

import ViewDashboardIcon from 'mdi-material-ui/ViewDashboard';
import {Divider} from '@material-ui/core';
import InformationIcon from 'mdi-material-ui/Information';
import Link from './Link';
import React from 'react';
import SettingsIcon from 'mdi-material-ui/Settings';
import LibraryBooksIcon from 'mdi-material-ui/LibraryBooks';
import ViewListIcon from 'mdi-material-ui/ViewList';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';
import {getProjectRoute, getProjectSettingsRoute, getProjectsListRoute} from "../../../utils/projectUtils";
import {getRouteFromString} from "../../../utils/appConfigUtils";

const UserLinks = props =>
  <div>
    <Link
      location={props.location}
      route={getDashboardRoute(getRouteFromString(props.activeDashboardTitle))}
      text={props.activeDashboardTitle}
      icon={<ViewDashboardIcon/>}
    >
      {props.activeProject && (
        <div>
          <Link
            location={props.location}
            route={getProjectRoute(getRouteFromString(props.activeDashboardTitle), getRouteFromString(props.activeProject.data().title))}
            text={props.activeProject.data().title}
            icon={<LibraryBooksIcon/>}
          />
          <Link
            location={props.location}
            route={getProjectsListRoute(getRouteFromString(props.activeDashboardTitle), getRouteFromString(props.activeProject.data().title))}
            text="Zoznam verzií"
            icon={<ViewListIcon/>}
          />
          <Link
            location={props.location}
            route={getProjectSettingsRoute(getRouteFromString(props.activeDashboardTitle), getRouteFromString(props.activeProject.data().title))}
            text="Nastavenia projektu"
            icon={<SettingsIcon/>}
          />
        </div>
      )}
    </Link>
    <Link
      location={props.location}
      route={getDashboardSettingsRoute(getRouteFromString(props.activeDashboardTitle))}
      text="Nastavenia nástenky"
      icon={<SettingsIcon/>}
    />
    <Divider/>
    <Link
      location={props.location}
      route={routes.ABOUT}
      text="O aplikácii"
      icon={<InformationIcon/>}
    />
  </div>;

UserLinks.propTypes = {
  location: propTypes.object.isRequired,
  activeDashboardTitle: propTypes.string.isRequired,
  activeProject: propTypes.object,
};

const mapStateToProps = state => {
  return {
    activeDashboardTitle: state.dashboard.selector.active.data().title || "Nástenka",
    activeProject: state.project.data.active,
  }
};

export default connect(mapStateToProps)(UserLinks);