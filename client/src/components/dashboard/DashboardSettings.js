import './DashboardSettings.scss';

import { Button, Fade, Paper, Typography } from '@material-ui/core';

import React from 'react';
import Switch from '../common/Switch';
import ThemePicker from '../themePicker/ThemePicker';
import TitleInput from './DashboardTitleInput';
import { connect } from 'react-redux';
import { dashboardConfig } from '../../config/app';
import { getDashboardSettingsDocumentTitleFromDashboard } from '../../utils/dashboardUtils';
import propTypes from 'prop-types';
import themePickerPropTypes from '../../propTypes/themePickerPropTypes';
import { timeouts } from '../../config/mui';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      default: false
    }
  }

  componentDidMount() {
    if (this.props.activeDashboard) {
      document.title = getDashboardSettingsDocumentTitleFromDashboard(this.props.activeDashboard);
      this.setState({
        title: this.props.activeDashboard.data().title,
      });
    }
  }

  settingsChanged = () => {
    return (this.state.title !== this.props.activeDashboard.data().title ||
      // TODO
      // this.state.default !== this.props.activeDashboardDefault ||
      this.props.activeDashboard.data().theme.id !== this.props.themePicker.theme ||
      this.props.activeDashboard.data().theme.inverted !== this.props.themePicker.inverted);
  }

  handleSubmit = () => {

  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.type === "checkbox" ? !this.state.default : event.target.value
    });
  }

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div>
          {this.props.activeDashboard && (
            <Paper className="dashboard-settings">
              <Typography variant="h5">Nastavenia - {this.state.title.length >= dashboardConfig.MIN_LENGTH ? this.state.title : this.props.activeDashboard.data().title}</Typography>
              <form onSubmit={this.handleSubmit}>
                <TitleInput
                  required
                  name="title"
                  title={this.state.title}
                  onChange={this.handleChange}
                />
                <Switch
                  name="default"
                  checked={this.state.default}
                  onChange={this.handleChange}
                  label="Nastaviť ako predvolenú nástenku"
                />
                <ThemePicker />
                <div className="action-buttons">
                  <Button
                    // TODO
                    disabled={this.state.title.length < dashboardConfig.MIN_LENGTH || !this.settingsChanged()}
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Uložiť
                  </Button>
                </div>
              </form>
            </Paper>
          )}
        </div>
      </Fade>
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeDashboard !== this.props.activeDashboard) {
      document.title = getDashboardSettingsDocumentTitleFromDashboard(this.props.activeDashboard);
      this.setState({
        title: this.props.activeDashboard.data().title,
      });
    }
  }
}

Settings.propTypes = {
  activeDashboard: propTypes.object,
  themePicker: themePickerPropTypes.themePicker.isRequired
}

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
    themePicker: state.themePicker
  }
}

export default connect(mapStateToProps)(Settings);