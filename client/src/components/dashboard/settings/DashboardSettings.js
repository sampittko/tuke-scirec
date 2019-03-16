import './DashboardSettings.scss';

import { Button, Fade, Paper, Typography } from '@material-ui/core';

import NewDefaultDashboardSelectMenu from './NewDefaultDashboardSelectMenu';
import React from 'react';
import RemoveDashboardConfirmDialog from './RemoveDashboardConfirmDialog';
import Switch from '../../common/Switch';
import ThemePicker from '../../themePicker/ThemePicker';
import TitleInput from '../../common/TitleInput';
import { connect } from 'react-redux';
import { dashboardConfig } from '../../../config/app';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import { getDashboardSettingsDocumentTitleFromDashboard } from '../../../utils/dashboardUtils';
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
    }
  }

  componentDidMount() {
    if (this.props.activeDashboard) {
      document.title = getDashboardSettingsDocumentTitleFromDashboard(this.props.activeDashboard);
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

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div>
          {this.props.dashboards && (
            <Paper className="dashboard-settings">
              <Typography variant="h5">Nastavenia - {this.state.title.length >= dashboardConfig.MIN_LENGTH ? this.state.title : this.props.activeDashboard.data().title}</Typography>
              <form onSubmit={this.handleSubmit}>
                <TitleInput
                  required
                  name="title"
                  title={this.state.title}
                  onChange={this.handleFormChange}
                  maxTitleLength={dashboardConfig.MAX_LENGTH}
                  label="Názov nástenky"
                />
                <Switch
                  name="default"
                  checked={this.state.default}
                  onChange={this.handleFormChange}
                  label="Nastaviť ako predvolenú nástenku"
                />
                {this.props.isDefault && this.state.default === false && (
                  <NewDefaultDashboardSelectMenu
                    value={this.state.newDefaultDashboardId}
                    onChange={this.handleSelectChange}
                    dashboards={this.props.dashboards}
                    activeDashboard={this.props.activeDashboard}
                  />
                )}
                <ThemePicker theme={this.props.activeDashboard.data().theme} />
                <div className="action-buttons">
                  <Button onClick={this.handleDeleteClick}>
                    Vymazať nástenku
                  </Button>
                  <Button
                    disabled={this.state.title.length < dashboardConfig.MIN_LENGTH || !this.settingsChanged()}
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Aktualizovať
                  </Button>
                </div>
              </form>
              <RemoveDashboardConfirmDialog
                open={this.state.confirmDialogOpen}
                newDefaultDashboardId={this.state.newDefaultDashboardId}
                onClick={this.handleDialogClose}
                onChange={this.handleSelectChange}
              />
            </Paper>
          )}
        </div>
      </Fade>
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeDashboard !== this.props.activeDashboard) {
      document.title = getDashboardSettingsDocumentTitleFromDashboard(this.props.activeDashboard);
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