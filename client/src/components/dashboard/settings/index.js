import '../../common/settings/settings.scss';
import {Fade, IconButton, Tooltip, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '../../common/settings/ExpansionPanel';
import NewDefaultDashboardSelectMenu from './NewDefaultDashboardSelectMenu';
import React from 'react';
import RemoveDashboardConfirmDialog from './RemoveDashboardConfirmDialog';
import SaveIcon from '@material-ui/icons/Save';
import Switch from '../../common/Switch';
import ThemePicker from '../../themePicker';
import TitleInput from '../../common/TitleInput';
import {connect} from 'react-redux';
import {dashboardConfig} from '../../../config/app';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import {getDashboardSettingsDocumentTitle, getDashboardSettingsRoute} from '../../../utils/dashboardUtils';
import propTypes from 'prop-types';
import themePickerPropTypes from '../../../propTypes/themePickerPropTypes';
import {timeouts} from '../../../config/mui';
import {updateDashboard} from '../../../store/actions/dashboardActions';
import {resetThemePicker, toggleDashboardSettingsMode} from "../../../store/actions/themePickerActions";
import Notification from "../../common/Notification";

class Settings extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      default: false,
      newDefaultDashboardId: "",
      confirmDialogOpen: false,
      expandedPanel: 0,
      changesSaved: false,
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
        changesSaved: true,
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
      if (this.state.title.length !== dashboardConfig.MAX_LENGTH || event.target.value.length < dashboardConfig.MAX_LENGTH) {
        this.setState({
          title: event.target.value
        });
      }
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
      expandedPanel: this.state.expandedPanel === panel ? 0 : panel
    });
  };

  getPanelActions = () => {
    switch (this.state.expandedPanel) {
      case 3:
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
            <div className="settings">
              <Typography variant="h5" className="page-title">
                Nastavenia nástenky <span
                className="text-bolder">{this.state.title.length >= dashboardConfig.MIN_LENGTH ? this.state.title : this.props.activeDashboard.data().title}</span>
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <ExpansionPanel
                  expanded={this.state.expandedPanel === 1}
                  onChange={(event) => this.handlePanelChange(event, 1)}
                  settingType="Všeobecné"
                  panelContent={
                    <div>
                      <TitleInput
                        required
                        name="title"
                        title={this.state.title}
                        onChange={this.handleFormChange}
                        maxTitleLength={dashboardConfig.MAX_LENGTH}
                        label="Názov nástenky"
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
                  settingType="Téma"
                  panelContent={<ThemePicker theme={this.props.activeDashboard.data().theme}/>}
                  panelActions={this.getPanelActions()}
                />
                <ExpansionPanel
                  expanded={this.state.expandedPanel === 3}
                  onChange={(event) => this.handlePanelChange(event, 3)}
                  settingType="Vymazanie nástenky"
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
              {this.state.changesSaved && <Notification message="Zmeny v nastaveniach boli uložené"/>}
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
      this.props.history.push(getDashboardSettingsRoute(this.props.activeDashboard.data().route));
      document.title = getDashboardSettingsDocumentTitle(this.props.activeDashboard)
    }
    if (prevState.changesSaved) {
      this.setState({
        changesSaved: false,
      });
    }
  }

  componentWillUnmount() {
    this.props.resetThemePicker();
    this._isMounted = false;
  }
}

Settings.propTypes = {
  activeDashboard: propTypes.object,
  themePicker: themePickerPropTypes.themePicker.isRequired,
  isDefault: propTypes.bool,
  dashboards: propTypes.arrayOf(propTypes.object),
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
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