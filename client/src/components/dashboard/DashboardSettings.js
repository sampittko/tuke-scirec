import './DashboardSettings.scss';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fade, FormControl, FormHelperText, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import { deleteDashboard, updateDashboard } from '../../store/actions/dashboardActions';

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
      this.state.default !== this.props.isDefault ||
      this.props.activeDashboard.data().theme.id !== this.props.themePicker.theme ||
      this.props.activeDashboard.data().theme.inverted !== this.props.themePicker.inverted);
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  handleClick = () => {
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

  handleChange = event => {
    if (event.target.type !== "checkbox") {
      if (this.state.title.length !== dashboardConfig.MAX_COUNT || event.target.value.length < dashboardConfig.MAX_LENGTH) {
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

  handleDelete = () => {
    this.props.deleteDashboard(this.props.activeDashboard.id, this.state.newDefaultDashboardId, this.props.userId);
    this.handleClose();
  }

  handleClose = () => {
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
                        required
                        value={this.state.newDefaultDashboardId}
                        onChange={this.handleSelectChange}
                        placeholder="Vyberte novú predvolenú nástenku"
                      >
                        {this.props.dashboards.map((dashboard, i) => (
                          <MenuItem
                            key={i}
                            value={dashboard.id}
                            disabled={dashboard.id === this.props.activeDashboard.id}
                          >
                            {dashboard.data().title}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>Nová predvolená nástenka</FormHelperText>
                    </FormControl>
                  </div>
                )}
                <ThemePicker theme={this.props.activeDashboard.data().theme} />
                <div className="action-buttons">
                  <Button
                    onClick={this.handleClick}
                  >
                    Vymazať nástenku
                  </Button>
                  <Button
                    disabled={this.state.title.length < dashboardConfig.MIN_LENGTH || !this.settingsChanged()}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={() => this.props.updateDashboard(this.props.activeDashboard.id, this.props.isDefault, this.props.newDefaultDashboardId, this.props.userId, {
                      title: this.state.title,
                      default: this.state.default,
                      theme: {
                        id: this.props.themePicker.theme,
                        inverted: this.props.themePicker.inverted,
                      }
                    })}
                  >
                    Uložiť
                  </Button>
                </div>
              </form>
              <Dialog open={this.state.confirmDialogOpen}>
                <DialogTitle>Vymazanie nástenky</DialogTitle>
                <DialogContent>
                  <Typography>
                    Naozaj si prajete vykonať túto akciu? Vymaže sa tým nástenka aj s projektami, ktoré sa v nej nachádzajú. Akcia je nenávratná!
                  </Typography>
                  <div className="default-dashboard-selector">
                    <FormControl>
                      <Select
                        required
                        value={this.state.newDefaultDashboardId}
                        onChange={this.handleSelectChange}
                        placeholder="Vyberte novú predvolenú nástenku"
                      >
                        {this.props.dashboards.map((dashboard, i) => (
                          <MenuItem
                            key={i}
                            value={dashboard.id}
                            disabled={dashboard.id === this.props.activeDashboard.id}
                          >
                            {dashboard.data().title}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>Nová predvolená nástenka</FormHelperText>
                    </FormControl>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose}>
                    Zrušiť
                  </Button>
                  <Button onClick={this.handleDelete} disabled={this.state.newDefaultDashboardId === ""} color="secondary">
                    Potvrdiť
                  </Button>
                </DialogActions>
              </Dialog>
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
  deleteDashboard: propTypes.func.isRequired,
  isDefault: propTypes.bool,
  dashboards: propTypes.arrayOf(propTypes.object),
  userId: propTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    deleteDashboard: (dashboardId, newDefaultDashboardId, userId) => dispatch(deleteDashboard(dashboardId, newDefaultDashboardId, userId)),
    updateDashboard: (dashboardId, prevDefault, newDefaultDashboardId, userId, data) => dispatch(updateDashboard(dashboardId, prevDefault, newDefaultDashboardId, userId, data)),
  }
}

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
    themePicker: state.themePicker,
    isDefault: state.dashboard.data.list && state.dashboard.selector.active.id === state.dashboard.data.default.id,
    dashboards: state.dashboard.data.list,
    userId: state.firebase.auth.uid,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);