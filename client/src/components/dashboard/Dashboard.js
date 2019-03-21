import './Dashboard.scss';

import AddIcon from '@material-ui/icons/Add';
import Fab from '../common/Fab';
import {Fade} from '@material-ui/core';
import NewProjectDialog from './DashboardNewProjectDialog';
import ProjectsList from './projectsList/DashboardProjectsList';
import React from 'react';
import {connect} from 'react-redux';
import {dashboardConfig} from '../../config/app';
import dashboardPropTypes from '../../propTypes/dashboardPropTypes';
import {getDashboardDocumentTitle} from '../../utils/dashboardUtils';
import propTypes from 'prop-types';
import {timeouts} from '../../config/mui';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    }
  }

  componentDidMount() {
    if (this.props.activeDashboard) {
      this.setDocumentTitle();
    }
  }

  setDocumentTitle = () => {
    document.title = getDashboardDocumentTitle(this.props.activeDashboard);
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  handleOpen = () => {
    this.setState({
      dialogOpen: true
    });
  };

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div className="dashboard">
          {this.props.activeDashboard && this.props.activeDashboard !== dashboardConfig.MAX_COUNT && (
            <div>
              <ProjectsList history={this.props.history}/>
              <Fab
                onClick={this.handleOpen}
                icon={<AddIcon/>}
                tooltipTitle="Vytvorenie nového projektu"
              />
            </div>
          )}
          <NewProjectDialog
            open={this.state.dialogOpen}
            onClick={this.handleClose}
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
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
};

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
    isDashboardLoading: state.dashboard.isLoading,
  }
};

export default connect(mapStateToProps)(Dashboard);