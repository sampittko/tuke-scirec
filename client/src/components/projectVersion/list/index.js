import React from 'react';
import {connect} from "react-redux";
import {
  getProjectVersions,
  removeActiveProjectVersion,
  setActiveProjectVersion
} from "../../../store/actions/projectVersionActions";
import {List, Paper, Typography} from "@material-ui/core";
import {getProjectVersionRoute, getReadableProjectVersionState} from "../../../utils/projectVersionUtils";
import {timeouts} from "../../../config/mui";
import Counter from './Counter';
import './index.scss';
import NoData from "./NoData";
import AddIcon from "@material-ui/icons/Add";
import NewVersionConfirmDialog from "../NewConfirmDialog";
import Fab from '../../common/Fab';
import propTypes from 'prop-types';
import projectVersionPropTypes from '../../../propTypes/projectVersionPropTypes';
import Fade from "@material-ui/core/Fade";
import ListItem from "../../common/list/Item";
import {projectVersionConfig} from "../../../config/app";

class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  componentDidMount() {
    if (this.props.activeProjectVersion) {
      this.props.removeActiveProjectVersion();
    }
    if (this.props.activeProject) {
      this.props.getProjectVersions();
    }
  }

  handleProjectVersionClick = (event, projectVersion) => {
    this.props.setProjectVersion(projectVersion);
    this.props.history.push(getProjectVersionRoute(this.props.activeDashboard.data().route, this.props.activeProject.data().route, projectVersion.data().versionNum));
  };

  handleDialogClick = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }))
  };

  render() {
    return (
      <div className="project-version-list">
        {this.props.activeProject && !this.props.isProjectVersionLoading && this.props.projectVersions.length > 0 ? (
          <Fade in timeout={timeouts.FADE_IN}>
            <div>
              <Typography
                className="page-title"
                variant="h5"
              >
                Verzie projektu <span className="text-bolder">{this.props.activeProject.data().title}</span>
              </Typography>
              <Paper>
                <List>
                  {this.props.projectVersions.map((projectVersion, i) => (
                    <ListItem
                      key={i}
                      disabled={projectVersion.data().state === projectVersionConfig.states.values.DELETED}
                      title={`Verzia ${String(projectVersion.data().versionNum)}`}
                      item={projectVersion}
                      modifiedTimestamp={projectVersion.data().modified}
                      onClick={(event, projectVersion) => this.handleProjectVersionClick(event, projectVersion)}
                      chipLabel={getReadableProjectVersionState(projectVersion.data().state)}
                    />
                  ))}
                </List>
              </Paper>
              <Counter projectVersionsCount={this.props.projectVersions.length}/>
            </div>
          </Fade>
        ) : (
          <NoData
            isProjectVersionLoading={this.props.isProjectVersionLoading}
            activeProject={this.props.activeProject}
          />
        )}
        {!this.props.isProjectVersionLoading && this.props.activeProject && (
          <div>
            <Fab
              onClick={this.handleDialogClick}
              icon={<AddIcon/>}
              tooltipTitle="Pridanie novej verzie projektu"
            />
            <NewVersionConfirmDialog
              open={this.state.open}
              onClick={this.handleDialogClick}
              activeProject={this.props.activeProject}
            />
          </div>
        )}
      </div>
    );
  }
}

ListComponent.propTypes = {
  getProjectVersions: propTypes.func.isRequired,
  setProjectVersion: propTypes.func.isRequired,
  activeProject: propTypes.object,
  projectVersions: propTypes.arrayOf(propTypes.object),
  isProjectVersionLoading: projectVersionPropTypes.isLoading.isRequired,
  history: propTypes.object.isRequired,
  activeProjectVersion: propTypes.object,
  removeActiveProjectVersion: propTypes.func.isRequired,
  activeDashboard: propTypes.object,
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectVersions: () => dispatch(getProjectVersions()),
    setProjectVersion: projectVersion => dispatch(setActiveProjectVersion(projectVersion)),
    removeActiveProjectVersion: () => dispatch(removeActiveProjectVersion()),
  }
};

const mapStateToProps = state => {
  return {
    activeProject: state.project.data.active,
    projectVersions: state.projectVersion.data.list,
    isProjectVersionLoading: state.projectVersion.isLoading,
    activeProjectVersion: state.projectVersion.data.active,
    activeDashboard: state.dashboard.selector.active,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);