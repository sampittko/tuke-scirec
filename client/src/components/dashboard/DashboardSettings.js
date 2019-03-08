import './DashboardSettings.scss';

import { Button, Fade, Paper, Typography } from '@material-ui/core';

import React from 'react';
import Switch from '../common/Switch';
import ThemePicker from '../themePicker/ThemePicker';
import TitleInput from './DashboardTitleInput';
import { connect } from 'react-redux';
import dashboardPropTypes from '../../propTypes/dashboardPropTypes';
import { getDashboardSettingsDocumentTitleFromDashboard } from '../../utils/dashboardUtils';
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
        title: this.props.activeDashboard.title,
      });
    }
  }

  handleSubmit = () => {

  }

  handleChange = () => {

  }

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div>
          {this.props.activeDashboard && (
            <Paper className="dashboard-settings">
              <Typography variant="h5">Nastavenia - {this.state.title}</Typography>
              <form onSubmit={this.handleSubmit}>
                <TitleInput
                  required
                  title={this.state.title}
                  onChange={this.handleChange}
                />
                <Switch
                  checked={this.state.default}
                  onChange={this.handleChange}
                  label="Nastaviť ako predvolenú nástenku"
                />
                <ThemePicker
                  themePicker={{
                    inverted: this.props.activeDashboard.theme.inverted,
                    theme: this.props.activeDashboard.theme.id
                  }}
                />
                <div className="action-buttons">
                  <Button
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
        title: this.props.activeDashboard.title,
      });
    }
  }
}

Settings.propTypes = {
  activeDashboard: dashboardPropTypes.dashboard,
}

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
  }
}

export default connect(mapStateToProps)(Settings);