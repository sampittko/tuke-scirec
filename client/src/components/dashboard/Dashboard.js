import './Dashboard.scss';

import AddIcon from '@material-ui/icons/Add';
import Fab from '../common/Fab';
import { Fade } from '@material-ui/core';
import NewProjectDialog from '../project/NewProjectDialog';
import ProjectsList from '../project/ProjectsList';
import React from 'react';
import { connect } from 'react-redux';
import { getDashboardDocumentTitleFromDashboard } from '../../utils/dashboardUtils';
import propTypes from 'prop-types';
import { timeouts } from '../../config/mui';

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
    document.title = getDashboardDocumentTitleFromDashboard(this.props.activeDashboard);
  }

  handleClose = () => {
    this.setState({
      dialogOpen: false
    });
  }

  handleOpen = () => {
    this.setState({
      dialogOpen: true
    });
  }

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div className="dashboard">
          <ProjectsList />
          <Fab
            onClick={this.handleOpen}
            icon={<AddIcon />}
          />
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
  match: propTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active
  }
}

export default connect(mapStateToProps)(Dashboard);