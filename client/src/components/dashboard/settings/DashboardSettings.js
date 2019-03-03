import React from 'react';
import { connect } from 'react-redux';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import { getDashboardSettingsDocumentTitleFromDashboard } from '../../../utils/dashboardUtils';

class DashboardSettings extends React.Component {
  componentDidMount() {
    document.title = getDashboardSettingsDocumentTitleFromDashboard(this.props.activeDashboard);
  }

  render() {
    return (
      "Hands"
    )
  }
}

DashboardSettings.propTypes = {
  activeDashboard: dashboardPropTypes.dashboard.isRequired
}

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active
  }
}

export default connect(mapStateToProps)(DashboardSettings);