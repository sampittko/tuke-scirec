import './DashboardSettings.scss';

import { Button, Fade, FormControl, FormHelperText, MenuItem, Paper, Select, Typography } from '@material-ui/core';

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
      default: false,
      newDefaultDashboardId: 0,
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
      this.state.default !== this.props.isDefault ||
      this.props.activeDashboard.data().theme.id !== this.props.themePicker.theme ||
      this.props.activeDashboard.data().theme.inverted !== this.props.themePicker.inverted);
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  handleClick = () => {
    if (this.props.activeDashboard.id !== this.props.defaultDashboard.id) {
      this.props.deleteDashboard(this.props.activeDashboard.id);
    }
  }

  handleSelectChange = event => {
    if (this.props.activeDashboard.data().created !== event.target.value) {
      this.setState({
        newDefaultDashboardId: event.target.value
      });
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
          {this.props.dashboards && (
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
                {this.props.isDefault && this.state.default === false && (
                  <div className="default-dashboard-selector">
                    <FormControl>
                      <Select
                        value={this.state.newDefaultDashboardId}
                        onChange={this.handleSelectChange}
                        placeholder="Vyberte novú predvolenú nástenku"
                      >
                        {this.props.dashboards.map((dashboard, i) => (
                          <MenuItem
                            key={i}
                            value={dashboard.data().created}
                            disabled={dashboard.id === this.props.activeDashboard.id}
                          >
                            {dashboard.data().title}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>Nová predvolená kategória</FormHelperText>
                    </FormControl>
                  </div>
                )}
                <ThemePicker theme={this.props.activeDashboard.data().theme}/>
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
      this.setState((prevState, props) => ({
        title: props.activeDashboard.data().title
      }));
    }
    if (prevProps.isDefault !== this.props.isDefault) {
      this.setState((prevState, props) => ({
        default: props.isDefault
      }));
    }
  }
}

Settings.propTypes = {
  activeDashboard: propTypes.object,
  themePicker: themePickerPropTypes.themePicker.isRequired,
  deleteDashboard: propTypes.func.isRequired,
  isDefault: propTypes.bool,
  dashboards: propTypes.arrayOf(propTypes.object),
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
    isDefault: state.dashboard.data.list && state.dashboard.selector.active.id === state.dashboard.data.default.id,
    dashboards: state.dashboard.data.list,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);