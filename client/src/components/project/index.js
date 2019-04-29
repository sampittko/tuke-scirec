import './index.scss';

import {Fade} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {getProjectDocumentTitle} from '../../utils/projectUtils';
import propTypes from 'prop-types';
import {timeouts} from '../../config/mui';
import {withRouter} from 'react-router';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Overview from "./overview";
import LatestVersion from "./latestVersion";
import Fab from "../common/Fab";
import PlusIcon from 'mdi-material-ui/Plus';
import NewVersionConfirmDialog from "./NewVersionConfirmDialog";
import Notification from "../common/Notification";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      notify: false,
    }
  }

  componentDidMount() {
    if (this.props.activeDashboard && this.props.activeProject) {
      document.title = getProjectDocumentTitle(this.props.activeDashboard, this.props.activeProject);
    }
  }

  handleClick = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }))
  };

  handleClose = () => {
    this.setState({
      notify: false,
    });
  };

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div>
          {this.props.activeDashboard && this.props.activeProject && (
            <div className="project">
              <Grid container>
                <Grid item>
                  <Typography variant="h5" className="page-title">
                    Projekt <span className="text-bolder">{this.props.activeProject.data().title}</span>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={4} className="col">
                  <Overview/>
                </Grid>
                <Grid item xs={12} sm={8} className="col">
                  <LatestVersion
                    activeProject={this.props.activeProject}
                    activeDashboard={this.props.activeDashboard}
                    history={this.props.history}
                  />
                </Grid>
              </Grid>
              {!this.props.isProjectVersionLoading && (
                <Fab
                  onClick={this.handleClick}
                  icon={<PlusIcon/>}
                  tooltipTitle="Pridanie novej verzie projektu"
                />
              )}
              <NewVersionConfirmDialog
                open={this.state.open}
                onClick={this.handleClick}
                activeProject={this.props.activeProject}
              />
            </div>
          )}
          {this.state.notify && (
            <Notification
              message={`Verzia ${this.props.activeProject.data().meta.versionsCount} bola úspešne pridaná`}
              onClose={this.handleClose}
            />
          )}
        </div>
      </Fade>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.activeProject) {
      if (prevProps.activeProject.data().meta.versionsCount < this.props.activeProject.data().meta.versionsCount) {
        this.setState({
          notify: true,
        });
      }
    }
  }
}

Project.propTypes = {
  activeDashboard: propTypes.object,
  activeProject: propTypes.object,
  isProjectVersionLoading: propTypes.bool.isRequired,
  history: propTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
    activeProject: state.project.data.active,
    isProjectVersionLoading: state.projectVersion.isLoading,
  }
};

export default withRouter(connect(mapStateToProps)(Project));