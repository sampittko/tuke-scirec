import './DashboardSettings.scss';

import { Button, Fade, Paper, Typography } from '@material-ui/core';

import React from 'react';
import Switch from '../common/Switch';
import ThemePicker from '../themePicker/ThemePicker';
import TitleInput from './DashboardTitleInput';
import { connect } from 'react-redux';
import { dashboardConfig } from '../../config/app';
import { deleteDashboard } from '../../store/actions/dashboardActions';
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
    console.log(this.state.default)
    console.log(this.props.isDefault)
    let changed = (this.state.title !== this.props.activeDashboard.data().title ||
      this.state.default !== this.props.isDefault ||
      this.props.activeDashboard.data().theme.id !== this.props.themePicker.theme ||
      this.props.activeDashboard.data().theme.inverted !== this.props.themePicker.inverted);
      console.log(changed)
    return changed;
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  handleClick = () => {
    if (this.props.activeDashboard.id !== this.props.defaultDashboard.id) {
      this.props.deleteDashboard(this.props.activeDashboard.id);
    }
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
                  <Button onClick={this.handleClick}>
                    Vymazať nástenku
                  </Button>
                  <Button
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
        default: this.props.isDefault,
      });
    }
  }
}

Settings.propTypes = {
  activeDashboard: propTypes.object,
  themePicker: themePickerPropTypes.themePicker.isRequired,
  deleteDashboard: propTypes.func.isRequired,
  isDefault: propTypes.bool,
}

const mapDispatchToProps = dispatch => {
  return {
    deleteDashboard: dashboardId => dispatch(deleteDashboard(dashboardId))
  }
}

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
    themePicker: state.themePicker,
    isDefault: state.dashboard.data.list && state.dashboard.selector.active.id === state.dashboard.data.default.id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);