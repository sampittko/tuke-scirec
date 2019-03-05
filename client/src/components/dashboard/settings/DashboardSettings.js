import React from 'react';
import { connect } from 'react-redux';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import { getDashboardSettingsDocumentTitleFromDashboard } from '../../../utils/dashboardUtils';

class Settings extends React.Component {
  componentDidMount() {
    document.title = getDashboardSettingsDocumentTitleFromDashboard(this.props.activeDashboard);
  }

  render() {
    return (
      "Hands"
    )
  }
}

Settings.propTypes = {
  activeDashboard: dashboardPropTypes.dashboard.isRequired
}

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active
  }
}

export default connect(mapStateToProps)(Settings);