import DashboardIcon from '@material-ui/icons/Dashboard';
import Link from './Link';
import React from 'react';
import { connect } from 'react-redux';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import { getDashboardRoute } from '../../../utils/dashboardUtils';
import propTypes from 'prop-types';

const UserLinks = props =>
  <div>
    <Link 
      location={props.location}
      route={getDashboardRoute(props.activeDashboardRoute)}
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