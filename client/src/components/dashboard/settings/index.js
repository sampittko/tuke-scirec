import './index.scss';
import {Fade, IconButton, Tooltip, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '../../common/ExpansionPanel';
import NewDefaultDashboardSelectMenu from './NewDefaultDashboardSelectMenu';
import React from 'react';
import RemoveDashboardConfirmDialog from './DeleteConfirmDialog';
import SaveIcon from '@material-ui/icons/Save';
import Switch from '../../common/Switch';
import ThemePicker from '../../themePicker';
import {connect} from 'react-redux';
import {dashboardConfig} from '../../../config/app';
import {getDashboardSettingsDocumentTitle, getDashboardSettingsRoute} from '../../../utils/dashboardUtils';
import propTypes from 'prop-types';
import {timeouts} from '../../../config/mui';
import {updateDashboard} from '../../../store/actions/dashboardActions';
import {resetThemePicker, toggleDashboardSettingsMode} from "../../../store/actions/themePickerActions";
import Notification from "../../common/Notification";
import {getRouteFromString} from "../../../utils/appConfigUtils";
import StringInput from "../../common/StringInput";

class Settings extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      default: false,
      newDefaultDashboardId: "",
      confirmDialogOpen: false,
      expandedPanel: -1,
      notify: false,
    }
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.activeDashboard) {
      document.title = getDashboardSettingsDocumentTitle(this.props.activeDashboard);
      this.setState({
        title: this.props.activeDashboard.data().title,
        default: this.props.isDefault,
      });
      this.props.toggleDashboardSettingsMode();
    }
  }

  settingsChanged = () => {
    return (this.state.title !== this.props.activeDashboard.data().title ||
      (
        (this.props.isDefault && this.state.newDefaultDashboardId !== "" && this.state.default !== this.props.isDefault) ||
        (!this.props.isDefault && this.state.default !== this.props.isDefault)
      ) ||
      this.props.activeDashboard.data().theme.id !== this.props.themePicker.theme ||
      this.props.activeDashboard.data().theme.inverted !== this.props.themePicker.inverted);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.updateDashboard(this.state.newDefaultDashboardId, {
      title: this.state.title,
      default: this.state.default,
      theme: {
        id: this.props.themePicker.theme,
        inverted: this.props.themePicker.inverted,
      }
    });
    if (this._isMounted) {
      this.setState({
        notify: true,
      })
    }
  };

  handleDeleteClick = () => {
    this.setState({
      confirmDialogOpen: true
    });
  };

  handleSelectChange = event => {
    if (this.props.activeDashboard.id !== event.target.value) {
      this.setState({
        newDefaultDashboardId: event.target.value
      });
    }
  };

  handleFormChange = event => {
    if (event.target.type !== "checkbox") {
      this.setState({
        title: event.target.value
      });
    } else {
      this.setState({
        default: !this.state.default
      });
    }
  };

  handleDialogClose = () => {
    if (this._isMounted) {
      this.setState({
        confirmDialogOpen: false
      });
    }
  };

  handlePanelChange = (event, panel) => {
    this.setState({
      expandedPanel: this.state.expandedPanel === panel ? -1 : panel
    });
  };

  handleClose = () => {
    this.setState({
      notify: false,
    })
  };

  getPanelActions = () => {
    if (this.state.expandedPanel === 3) {
      return (
        <Tooltip
          title="Vymazať nástenku"
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
    } else {
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
                disabled={this.state.title.length < dashboardConfig.MIN_LENGTH || !this.settingsChanged()}
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
          {this.props.dashboards && (
            <div className="dashboard-settings">
              <Typography variant="h5" className="page-title">
                Nastavenia nástenky <span
                className="text-bolder">{this.state.title.length >= dashboardConfig.MIN_LENGTH ? this.state.title : this.props.activeDashboard.data().title}</span>
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <ExpansionPanel
                  expanded={this.state.expandedPanel === 1}
                  onChange={(event) => this.handlePanelChange(event, 1)}
                  title="Všeobecné"
                  panelContent={
                    <div>
                      <StringInput
                        required
                        name="title"
                        onChange={this.handleFormChange}
                        label="Názov nástenky"
                        maxLength={dashboardConfig.MAX_LENGTH}
                        value={this.state.title}
                      />
                      <Typography className="title-description">
                        Dĺžka názvu nástenky musí mať
                        od {dashboardConfig.MIN_LENGTH} do {dashboardConfig.MAX_LENGTH} znakov
                      </Typography>
                      <Switch
                        name="default"
                        checked={this.state.default}
                        onChange={this.handleFormChange}
                        label="Nastaviť ako predvolenú nástenku"
                      />
                      {this.props.isDefault && !this.state.default && !this.state.confirmDialogOpen && (
                        <NewDefaultDashboardSelectMenu
                          value={this.state.newDefaultDashboardId}
                          onChange={this.handleSelectChange}
                          dashboards={this.props.dashboards}
                          activeDashboard={this.props.activeDashboard}
                        />
                      )}
                    </div>
                  }
                  panelActions={this.getPanelActions()}
                />
                <ExpansionPanel
                  expanded={this.state.expandedPanel === 2}
                  onChange={(event) => this.handlePanelChange(event, 2)}
                  title="Téma"
                  panelContent={<ThemePicker theme={this.props.activeDashboard.data().theme}/>}
                  panelActions={this.getPanelActions()}
                />
                <ExpansionPanel
                  expanded={this.state.expandedPanel === 3}
                  onChange={(event) => this.handlePanelChange(event, 3)}
                  title="Vymazanie nástenky"
                  panelContent={(
                    <Typography>
                      Vymazanie nástenky je nenávratná akcia a jej vykonaním sa vymažu aj všetky projekty, ktoré sa v
                      nej nachádzajú vrátane projektov v archíve.
                    </Typography>
                  )}
                  panelActions={this.getPanelActions()}
                />
              </form>
              <RemoveDashboardConfirmDialog
                open={this.state.confirmDialogOpen}
                newDefaultDashboardId={this.state.newDefaultDashboardId}
                onClick={this.handleDialogClose}
                onChange={this.handleSelectChange}
                history={this.props.history}
              />
              {this.state.notify && (
                <Notification
                  message="Zmeny v nastaveniach boli úspešne uložené"
                  onClose={this.handleClose}
                />
              )}
            </div>
          )}
        </div>
      </Fade>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activeDashboard !== this.props.activeDashboard) {
      this.setState((prevState, props) => ({
        title: props.activeDashboard.data().title,
      }));
    }
    if (prevProps.activeDashboard && this.props.activeDashboard && prevProps.activeDashboard.data().title !== this.props.activeDashboard.data().title) {
      this.props.history.push(getDashboardSettingsRoute(getRouteFromString(this.props.activeDashboard.data().title)));
      document.title = getDashboardSettingsDocumentTitle(this.props.activeDashboard)
    }
  }

  componentWillUnmount() {
    this.props.resetThemePicker();
    this._isMounted = false;
  }
}

Settings.propTypes = {
  activeDashboard: propTypes.object,
  themePicker: propTypes.object.isRequired,
  isDefault: propTypes.bool,
  dashboards: propTypes.arrayOf(propTypes.object),
  isDashboardLoading: propTypes.bool.isRequired,
  resetThemePicker: propTypes.func.isRequired,
  history: propTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    updateDashboard: (newDefaultDashboardId, data) => dispatch(updateDashboard(newDefaultDashboardId, data)),
    resetThemePicker: () => dispatch(resetThemePicker()),
    toggleDashboardSettingsMode: () => dispatch(toggleDashboardSettingsMode()),
  }
};

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
    themePicker: state.themePicker,
    isDefault: state.dashboard.data.list && state.dashboard.selector.active.id === state.dashboard.data.default.id,
    dashboards: state.dashboard.data.list,
    isDashboardLoading: state.dashboard.isLoading,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);