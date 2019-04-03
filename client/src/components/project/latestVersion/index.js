import React from 'react';
import Typography from "@material-ui/core/Typography/index";
import propTypes from 'prop-types';
import ProjectVersion from "../../projectVersion";
import NoData from "./NoData";
import './index.scss';
import {Fade, Tooltip} from "@material-ui/core";
import {timeouts} from "../../../config/mui";
import {connect} from "react-redux";
import {getLatestProjectVersion} from "../../../store/actions/projectVersionActions";
import projectVersionPropTypes from '../../../propTypes/projectVersionPropTypes';
import {getProjectsListRoute} from "../../../utils/projectUtils";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from '@material-ui/icons/List';

class LatestVersion extends React.Component {
  componentDidMount() {
    if (!this.props.latestProjectVersion && this.props.activeProject.data().versionsCount !== 0) {
      this.props.getLatestProjectVersion();
    }
  }

  handleClick = () => {
    this.props.history.push(
      getProjectsListRoute(this.props.activeDashboard.data().route, this.props.activeProject.data().route)
    );
  };

  render() {
    return (
      <div
        className={`latest-project-version ${this.props.activeProject.data().versionsCount > 0 || this.props.isProjectVersionLoading ? "" : "empty"}`}>
        {this.props.activeProject.data().versionsCount > 0 || this.props.isProjectVersionLoading ? (
          <Fade in timeout={timeouts.FADE_IN}>
            <div>
              <Typography variant="h6" className="page-title">
                Verzia {this.props.activeProject.data().versionsCount > 0 ? this.props.activeProject.data().versionsCount : 1}
                <Tooltip title="Zobraziť zoznam verzií projektu" placement="left">
                  <IconButton
                    onClick={this.handleClick}
                    className="project-versions-list-icon"
                  >
                    <ListIcon/>
                  </IconButton>
                </Tooltip>
              </Typography>
              <ProjectVersion latest/>
            </div>
          </Fade>
        ) : (
          <NoData activeProject={this.props.activeProject}/>
        )}
      </div>
    );
  }
}

LatestVersion.propTypes = {
  activeProject: propTypes.object.isRequired,
  activeDashboard: propTypes.object.isRequired,
  latestProjectVersion: propTypes.object,
  isProjectVersionLoading: projectVersionPropTypes.isLoading.isRequired,
  history: propTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    getLatestProjectVersion: () => dispatch(getLatestProjectVersion()),
  }
};

const mapStateToProps = state => {
  return {
    latestProjectVersion: state.projectVersion.data.latest,
    isProjectVersionLoading: state.projectVersion.isLoading,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestVersion);