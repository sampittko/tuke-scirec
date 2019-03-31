import React from 'react';
import ListComponent from '../../common/List';
import {connect} from "react-redux";
import {
  getProjectVersions,
  removeActiveProjectVersion,
  setActiveProjectVersion
} from "../../../store/actions/projectVersionActions";
import {ListItem, ListItemText, Paper, Typography} from "@material-ui/core";
import TimestampText from "../../common/TimestampText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/index";
import Chip from "@material-ui/core/Chip/index";
import {getProjectVersionRoute, getReadableProjectVersionState} from "../../../utils/projectVersionUtils";
import Fade from "@material-ui/core/Fade/index";
import {timeouts} from "../../../config/mui";
import Counter from './Counter';
import './index.scss';
import NoData from "./NoData";
import AddIcon from "@material-ui/icons/Add";
import NewVersionConfirmDialog from "../NewConfirmDialog";
import Fab from '../../common/Fab';
import propTypes from 'prop-types';
import projectVersionPropTypes from '../../../propTypes/projectVersionPropTypes';

class List extends React.Component {
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
                <ListComponent>
                  {this.props.projectVersions.map(projectVersion => (
                    <ListItem button
                              key={projectVersion.id}
                              className="item"
                              onClick={(event) => this.handleProjectVersionClick(event, projectVersion)}
                    >
                      <ListItemText inset
                                    primary={`Verzia ${projectVersion.data().versionNum}`}
                                    secondary={(
                                      <TimestampText
                                        timestamp={projectVersion.data().modified}
                                        frontText="Naposledy upravené:"
                                      />
                                    )}
                      />
                      <ListItemSecondaryAction className="state">
                        <Chip
                          variant="outlined"
                          label={getReadableProjectVersionState(projectVersion.data().state)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </ListComponent>
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

List.propTypes = {
  getProjectVersions: propTypes.func.isRequired,
  setProjectVersion: propTypes.func.isRequired,
  activeProject: propTypes.object,
  projectVersions: propTypes.arrayOf(propTypes.object),
  isProjectVersionLoading: projectVersionPropTypes.isLoading.isRequired,
  history: propTypes.object.isRequired,
  activeProjectVersion: propTypes.object,
  removeActiveProjectVersion: propTypes.func.isRequired,
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);