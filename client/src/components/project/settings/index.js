import './index.scss';

import {Fade, IconButton, Tooltip, Typography} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '../../common/ExpansionPanel';
import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {timeouts} from '../../../config/mui';
import Notification from "../../common/Notification";
import {getProjectSettingsDocumentTitle, getProjectSettingsRoute} from "../../../utils/projectUtils";
import {projectConfig} from "../../../config/app";
import RemoveProjectConfirmDialog from "./RemoveProjectConfirmDialog";
import TitleInput from '../../common/TitleInput';
import {updateProjectTitle} from "../../../store/actions/projectActions";

class Settings extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      confirmDialogOpen: false,
      expandedPanel: 0,
      changesSaved: false,
    }
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.activeProject) {
      document.title = getProjectSettingsDocumentTitle(this.props.activeDashboard, this.props.activeProject);
      this.setState({
        title: this.props.activeProject.data().title,
      });
    }
  }

  settingsChanged = () => {
    return this.state.title !== this.props.activeProject.data().title;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.updateProjectTitle(this.state.title);
    if (this._isMounted) {
      this.setState({
        changesSaved: true,
      })
    }
  };

  handleDeleteClick = () => {
    this.setState({
      confirmDialogOpen: true
    });
  };

  handleDialogClose = () => {
    this.setState({
      confirmDialogOpen: false
    });
  };

  handlePanelChange = (event, panel) => {
    this.setState({
      expandedPanel: this.state.expandedPanel === panel ? 0 : panel
    });
  };

  handleFormChange = event => {
    if (this.state.title.length !== projectConfig.MAX_LENGTH || event.target.value.length < projectConfig.MAX_LENGTH) {
      this.setState({
        title: event.target.value
      });
    }
  };

  getPanelActions = () => {
    switch (this.state.expandedPanel) {
      case 2:
        return (
          <Tooltip
            title="Vymazať projekt"
            placement="right"
            disableFocusListener
            className="tooltip"
          >
            <div>
              <IconButton
                onClick={this.handleDeleteClick}
                color="secondary"
                size="small"
              >
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </div>
          </Tooltip>
        );
      default:
        return (
          <div>
            {this.settingsChanged() && (
              <Fade in timeout={timeouts.FADE_IN}>
                <Typography className="changes-not-saved">
                  Zmeny ešte neboli uložené
                </Typography>
              </Fade>
            )}
            <Tooltip
              title="Uložiť zmeny"
              placement="right"
              disableFocusListener
              className="tooltip"
            >
              <div>
                <IconButton
                  disabled={this.state.title.length < projectConfig.MIN_LENGTH || !this.settingsChanged()}
                  type="submit"
                  color="secondary"
                  size="small"
                >
                  <SaveIcon fontSize="small"/>
                </IconButton>
              </div>
            </Tooltip>
          </div>
        );
    }
  };

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div>
          {this.props.activeProject && (
            <div className="project-settings">
              <Typography variant="h5" className="page-title">
                Nastavenia projektu <span
                className="text-bolder">{this.state.title.length >= projectConfig.MIN_LENGTH ? this.state.title : this.props.activeProject.data().title}</span>
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <ExpansionPanel
                  expanded={this.state.expandedPanel === 1}
                  onChange={(event) => this.handlePanelChange(event, 1)}
                  title="Všeobecné"
                  panelContent={
                    <div>
                      <TitleInput
                        required
                        name="title"
                        title={this.state.title}
                        onChange={this.handleFormChange}
                        maxTitleLength={projectConfig.MAX_LENGTH}
                        label="Názov projektu"
                      />
                      <Typography className="title-description">
                        Dĺžka názvu projektu musí mať
                        od {projectConfig.MIN_LENGTH} do {projectConfig.MAX_LENGTH} znakov
                      </Typography>
                    </div>
                  }
                  panelActions={this.getPanelActions()}
                />
                <ExpansionPanel
                  expanded={this.state.expandedPanel === 2}
                  onChange={(event) => this.handlePanelChange(event, 2)}
                  title="Vymazanie projektu"
                  panelContent={(
                    <Typography>
                      Vymazanie projektu je nenávratná akcia a jej vykonaním sa vymažú aj všetky príslušné verzie
                      projektu.
                    </Typography>
                  )}
                  panelActions={this.getPanelActions()}
                />
              </form>
              <RemoveProjectConfirmDialog
                open={this.state.confirmDialogOpen}
                onClick={this.handleDialogClose}
                history={this.props.history}
                activeDashboard={this.props.activeDashboard}
              />
              {this.state.changesSaved && <Notification message="Zmeny v nastaveniach boli uložené"/>}
            </div>
          )}
        </div>
      </Fade>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activeProject && this.props.activeProject && prevProps.activeProject.data().title !== this.props.activeProject.data().title) {
      this.props.history.push(getProjectSettingsRoute(this.props.activeDashboard.data().route, this.props.activeProject.data().route));
      document.title = getProjectSettingsDocumentTitle(this.props.activeDashboard, this.props.activeProject)
    }
    if (prevState.changesSaved) {
      this.setState({
        changesSaved: false,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

Settings.propTypes = {
  activeProject: propTypes.object,
  activeDashboard: propTypes.object,
  history: propTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    updateProjectTitle: title => dispatch(updateProjectTitle(title)),
  }
};

const mapStateToProps = state => {
  return {
    activeProject: state.project.data.active,
    activeDashboard: state.dashboard.selector.active,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);