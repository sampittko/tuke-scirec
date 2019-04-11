import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import './index.scss';
import PaperActions from "../../common/PaperActions";
import Editables from "./Editables";
import Readables from "./Readables";
import {connect} from "react-redux";
import projectVersionPropTypes from '../../../propTypes/projectVersionPropTypes';
import Loader from "../../common/Loader";
import Notification from "../../common/Notification";
import {fileConfig, projectVersionConfig} from "../../../config/app";
import {updateProjectVersion} from "../../../store/actions/projectVersionActions";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import File from "../../file";
import {resetFileState} from "../../../store/actions/fileActions";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      notify: false,
      notes: projectVersionConfig.defaultValues.NOTES,
      state: projectVersionConfig.defaultValues.STATE,
      open: false,
    }
  }

  componentDidMount() {
    if (this.props.activeProjectVersion) {
      if (this.props.activeProjectVersion.data().notes !== this.state.notes && this.props.activeProjectVersion.data().state !== this.state.state) {
        this.setState({
          notes: this.props.activeProjectVersion.data().notes,
          state: this.props.activeProjectVersion.data().state,
        });
      } else if (this.props.activeProjectVersion.data().state !== this.state.state) {
        this.setState({
          state: this.props.activeProjectVersion.data().state,
        });
      } else if (this.props.activeProjectVersion.data().notes !== this.state.notes) {
        this.setState({
          notes: this.props.activeProjectVersion.data().notes,
        });
      }
    }
  }

  settingsChanged = () => {
    return (this.props.activeProjectVersion.data().state !== this.state.state ||
      this.props.activeProjectVersion.data().notes !== this.state.notes);
  };

  handleActionClick = async (event, action) => {
    switch (action) {
      case 'edit':
        this.setState({
          editMode: true,
        });
        break;
      case 'save':
        await this.props.updateProjectVersion({
          state: this.state.state,
          notes: this.state.notes,
        });
        this.setState({
          notify: true,
          editMode: false,
        });
        break;
      case 'cancel':
        this.setState((prevState, props) => ({
          editMode: false,
          state: props.activeProjectVersion.data().state,
          notes: props.activeProjectVersion.data().notes,
        }));
        break;
      case 'delete':
        this.setState({
          open: true,
        });
        break;
      default:
        console.log("Bad action");
        break;
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  };

  handleClose = () => {
    this.setState({
      notify: false,
    })
  };

  handleDialogClick = () => {
    this.setState({
      open: false,
    })
  };

  render() {
    return (
      <div className={`project-version-detail ${this.props.latest ? "latest" : ""}`}>
        <Typography variant={this.props.latest ? "body1" : "h6"} className="page-title">Detail</Typography>
        <Paper
          className={`paper ${this.props.isProjectVersionLoading ? 'paddingless' : ''} ${this.props.isProjectVersionUpdating ? "updating" : ""}`}>
          {(!this.props.isProjectVersionLoading && this.props.activeProjectVersion) || this.props.isProjectVersionUpdating ? (
            <div>
              {this.state.editMode ? (
                <Editables
                  state={this.state.state}
                  notes={this.state.notes}
                  onChange={this.handleChange}
                />
              ) : (
                <Readables
                  state={this.state.state}
                  notes={this.state.notes}
                />
              )}
              <File
                latest={this.props.latest}
                ownerEntity={this.props.activeProjectVersion}
                editable={this.state.editMode}
                filesIndex={fileConfig.PROJECT_VERSION_FILES_INDEX}
              />
              <PaperActions
                updating={this.props.isProjectVersionUpdating}
                deleteVisible={true}
                editMode={this.state.editMode}
                settingsChanged={this.settingsChanged}
                onClick={(event, action) => this.handleActionClick(event, action)}
              />
            </div>
          ) : (
            <Loader/>
          )}
        </Paper>
        {this.state.notify && (
          <Notification
            message="Zmeny boli úspešne uložené"
            onClose={this.handleClose}
          />
        )}
        {this.props.activeProjectVersion && (
          <DeleteConfirmDialog
            open={this.state.open}
            onClick={this.handleDialogClick}
          />
        )}
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activeProjectVersion !== this.props.activeProjectVersion && this.props.activeProjectVersion) {
      if (this.props.activeProjectVersion.data().notes !== this.state.notes && this.props.activeProjectVersion.data().state !== this.state.state) {
        this.setState({
          notes: this.props.activeProjectVersion.data().notes,
          state: this.props.activeProjectVersion.data().state,
        });
      } else if (this.props.activeProjectVersion.data().state !== this.state.state) {
        this.setState({
          state: this.props.activeProjectVersion.data().state,
        });
      } else if (this.props.activeProjectVersion.data().notes !== this.state.notes) {
        this.setState({
          notes: this.props.activeProjectVersion.data().notes,
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.resetFileState();
  }
}

Detail.propTypes = {
  latest: propTypes.bool,
  isProjectVersionLoading: projectVersionPropTypes.isLoading.isRequired,
  isProjectVersionUpdating: projectVersionPropTypes.isUpdating.isRequired,
  activeProjectVersion: propTypes.object,
  updateProjectVersion: propTypes.func.isRequired,
  resetFileState: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    updateProjectVersion: async (data) => dispatch(updateProjectVersion(data)),
    resetFileState: () => dispatch(resetFileState()),
  }
};

const mapStateToProps = state => {
  return {
    isProjectVersionLoading: state.projectVersion.isLoading,
    isProjectVersionUpdating: state.projectVersion.isUpdating,
    activeProjectVersion: state.projectVersion.data.active,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);