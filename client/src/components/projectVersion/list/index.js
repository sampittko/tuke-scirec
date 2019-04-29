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
import PlusIcon from "mdi-material-ui/Plus";
import NewVersionConfirmDialog from "../../project/NewVersionConfirmDialog";
import Fab from '../../common/Fab';
import propTypes from 'prop-types';
import Fade from "@material-ui/core/Fade";
import ListItem from "../../common/ListItem";
import {projectVersionConfig} from "../../../config/app";
import {getProjectsListDocumentTitle} from "../../../utils/projectUtils";
import {getRouteFromString} from "../../../utils/appConfigUtils";

class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  componentDidMount() {
    if (this.props.activeDashboard && this.props.activeProject) {
      document.title = getProjectsListDocumentTitle(this.props.activeDashboard, this.props.activeProject);
    }
    if (this.props.activeProjectVersion) {
      this.props.removeActiveProjectVersion();
    }
    if (this.props.activeProject) {
      this.props.getProjectVersions();
    }
  }

  handleProjectVersionClick = (event, projectVersion) => {
    this.props.setActiveProjectVersion(projectVersion);
    this.props.history.push(getProjectVersionRoute(getRouteFromString(this.props.activeDashboard.data().title), getRouteFromString(this.props.activeProject.data().title), projectVersion.data().versionNum));
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
                      disabled={projectVersion.data().detail.state === projectVersionConfig.states.values.DELETED}
                      title={`Verzia ${String(projectVersion.data().versionNum)}`}
                      item={projectVersion}
                      modifiedTimestamp={projectVersion.data().meta.modified}
                      onClick={(event, projectVersion) => this.handleProjectVersionClick(event, projectVersion)}
                      chipLabel={getReadableProjectVersionState(projectVersion.data().detail.state)}
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
              icon={<PlusIcon/>}
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
  setActiveProjectVersion: propTypes.func.isRequired,
  activeProject: propTypes.object,
  projectVersions: propTypes.arrayOf(propTypes.object),
  isProjectVersionLoading: propTypes.bool.isRequired,
  history: propTypes.object.isRequired,
  activeProjectVersion: propTypes.object,
  removeActiveProjectVersion: propTypes.func.isRequired,
  activeDashboard: propTypes.object,
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectVersions: () => dispatch(getProjectVersions()),
    setActiveProjectVersion: projectVersion => dispatch(setActiveProjectVersion(projectVersion)),
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