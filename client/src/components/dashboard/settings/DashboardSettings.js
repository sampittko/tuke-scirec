import './DashboardSettings.scss';

import { Fade, IconButton, Typography } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from './ExpansionPanel';
import NewDefaultDashboardSelectMenu from './DashboardNewDefaultDashboardSelectMenu';
import React from 'react';
import RemoveDashboardConfirmDialog from './RemoveDashboardConfirmDialog';
import SaveIcon from '@material-ui/icons/Save';
import Switch from '../../common/Switch';
import ThemePicker from '../../themePicker/ThemePicker';
import TitleInput from '../../common/TitleInput';
import { connect } from 'react-redux';
import { dashboardConfig } from '../../../config/app';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import { getDashboardSettingsDocumentTitle } from '../../../utils/dashboardUtils';
import propTypes from 'prop-types';
import themePickerPropTypes from '../../../propTypes/themePickerPropTypes';
import { timeouts } from '../../../config/mui';
import { updateDashboard } from '../../../store/actions/dashboardActions';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      default: false,
      newDefaultDashboardId: "",
      confirmDialogOpen: false,
      expandedPanel: 0,
    }
  }

  componentDidMount() {
    if (this.props.activeDashboard) {
      document.title = getDashboardSettingsDocumentTitle(this.props.activeDashboard);
      this.setState({
        title: this.props.activeDashboard.data().title,
        default: this.props.isDefault,
      });
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
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateDashboard(this.state.newDefaultDashboardId, {
      title: this.state.title,
      default: this.state.default,
      theme: {
        id: this.props.themePicker.theme,
        inverted: this.props.themePicker.inverted,
      }
    })
  }

  handleDeleteClick = () => {
    this.setState({
      confirmDialogOpen: true
    });
  }

  handleSelectChange = event => {
    if (this.props.activeDashboard.id !== event.target.value) {
      this.setState({
        newDefaultDashboardId: event.target.value
      });
    }
  }

  handleFormChange = event => {
    if (event.target.type !== "checkbox") {
      if (this.state.title.length !== dashboardConfig.MAX_LENGTH || event.target.value.length < dashboardConfig.MAX_LENGTH) {
        this.setState({
          title: event.target.value
        });
      }
    }
    else {
      this.setState({
        default: !this.state.default
      });
    }
  }

  handleDialogClose = () => {
    this.setState({
      confirmDialogOpen: false
    });
  }

  handlePanelChange = (event, panel) => {
    this.setState({
      expandedPanel: this.state.expandedPanel === panel ? 0 : panel
    });
  }

  getPanelActions = () => {
    switch (this.state.expandedPanel) {
      case 3:
        return (
          <IconButton
            onClick={this.handleDeleteClick}
            color="secondary"
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        );
      default:
        return (
          <IconButton
            disabled={this.state.title.length < dashboardConfig.MIN_LENGTH || !this.settingsChanged()}
            type="submit"
            color="secondary"
            size="small"
          >
            <SaveIcon fontSize="small" />
          </IconButton>
        );
    }
  }

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div>
          {this.props.dashboards && (
            <div className="dashboard-settings">
              <Typography
                variant="h5"
                className="page-title"
              >
                Nastavenia nástenky <span className="dashboard-title">{this.state.title.length >= dashboardConfig.MIN_LENGTH ? this.state.title : this.props.activeDashboard.data().title}</span>
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
                        Dĺžka názvu nástenky musí mať od {dashboardConfig.MIN_LENGTH} do {dashboardConfig.MAX_LENGTH} znakov
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
                  panelContent={<ThemePicker theme={this.props.activeDashboard.data().theme} />}
                  panelActions={this.getPanelActions()}
                />
                <ExpansionPanel
                  expanded={this.state.expandedPanel === 3}
                  onChange={(event) => this.handlePanelChange(event, 3)}
                  settingType="Vymazanie nástenky"
                  panelContent={(
                    <Typography>
                      Vymazanie nástenky je nenávratná akcia a jej vykonaním sa vymažu aj všetky projekty, ktoré sa v nej nachádzajú.
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
              />
            </div>
          )}
        </div>
      </Fade>
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeDashboard !== this.props.activeDashboard) {
      document.title = getDashboardSettingsDocumentTitle(this.props.activeDashboard);
      this.setState((prevState, props) => ({
        title: props.activeDashboard.data().title,
      }));
    }
  }
}

Settings.propTypes = {
  activeDashboard: propTypes.object,
  themePicker: themePickerPropTypes.themePicker.isRequired,
  isDefault: propTypes.bool,
  dashboards: propTypes.arrayOf(propTypes.object),
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    updateDashboard: (newDefaultDashboardId, data) => dispatch(updateDashboard(newDefaultDashboardId, data)),
  }
}

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
    themePicker: state.themePicker,
    isDefault: state.dashboard.data.list && state.dashboard.selector.active.id === state.dashboard.data.default.id,
    dashboards: state.dashboard.data.list,
    isDashboardLoading: state.dashboard.isLoading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);