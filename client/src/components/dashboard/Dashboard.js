import './Dashboard.scss';

import AddIcon from '@material-ui/icons/Add';
import Fab from '../common/Fab';
import { Fade } from '@material-ui/core';
import ProjectsList from '../project/ProjectsList';
import React from 'react';
import { connect } from 'react-redux';
import { getDashboardDocumentTitleFromDashboard } from '../../utils/dashboardUtils';
import propTypes from 'prop-types';
import routes from '../../config/app/routes';
import { timeouts } from '../../config/mui';

class Dashboard extends React.Component {
  componentDidMount() {
    if (this.props.activeDashboard) {
      this.setDocumentTitle();
    }
  }

  setDocumentTitle = () => {
    document.title = getDashboardDocumentTitleFromDashboard(this.props.activeDashboard);
  }

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div className="dashboard">
          <ProjectsList activeDashboardRoute={this.props.match.params.dashboardRoute} />
          <Fab
            onClick={() => this.props.history.push(routes.NEW_PROJECT)}
            icon={<AddIcon />}
          />
        </div>
      </Fade>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeDashboard !== this.props.activeDashboard) {
      this.setDocumentTitle();
    }
  }
}

Dashboard.propTypes = {
  activeDashboard: propTypes.any,
  match: propTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active
  }
}

export default connect(mapStateToProps)(Dashboard);