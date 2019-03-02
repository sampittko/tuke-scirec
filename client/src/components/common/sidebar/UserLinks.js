import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import routes from '../../../config/app/routes';
import Link from './Link';
import DashboardIcon from '@material-ui/icons/Dashboard';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';

const UserLinks = props =>
  <div>
    <Link 
      location={props.location}
      route={`${routes.DASHBOARDS}/${props.activeDashboardRoute}`}
      text={props.activeDashboardTitle}
      icon={<DashboardIcon />}
    />
  </div>;

UserLinks.propTypes = {
  location: propTypes.object.isRequired,
  dashboards: propTypes.arrayOf(dashboardPropTypes.dashboard),
  activeDashboard: propTypes.any,
  activeDashboardRoute: propTypes.string
}

const mapStateToProps = state => {
  return {
    dashboards: state.dashboard.data.list,
    activeDashboardTitle: state.dashboard.selector.active.title || "Nástenka",
    activeDashboardRoute: state.dashboard.selector.activeRoute || "",
  }
}

export default connect(mapStateToProps)(UserLinks);