import './NewDashboardDialog.scss';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import React from 'react';
import Switch from '../../common/Switch';
import ThemePicker from '../../themePicker/ThemePicker';
import TitleInput from './NewDashboardTitleInput';
import { connect } from 'react-redux';
import { dashboardConfig } from '../../../config/app';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import propTypes from 'prop-types';
import { resetThemePicker } from '../../../store/actions/themePickerActions';
import themePickerPropTypes from '../../../propTypes/themePickerPropTypes';

class NewDashboardDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      default: false
    }
  }

  handleClick = (event, newDashboard) => {
    if (this.state.default) {
      this.setState({
        default: false
      });
    }
    if (this.props.themePicker.inverted || this.props.themePicker.theme !== 0) {
      this.props.resetThemePicker();
    }
    this.props.onClick(event, newDashboard);
  }

  handleChange = () => {
    this.setState({
      default: !this.state.default
    });
  }

  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>Vytvorenie novej nástenky</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pre vytvorenie novej nástenky zadajte nižšie jej názov pričom jeho dĺžka musí byť od {dashboardConfig.MIN_LENGTH} do {dashboardConfig.MAX_LENGTH} znakov. Maximálny počet násteniek je {dashboardConfig.MAX_COUNT}.
          </DialogContentText>
          <TitleInput
            title={this.props.title}
            onChange={this.props.handleTitleChange}
          />
          <ThemePicker />
          <Switch
            checked={this.state.default}
            onChange={this.handleChange}
            label="Nastaviť ako predvolenú nástenku"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClick}
            color="primary"
            disabled={this.props.isDashboardLoading}
          >
            Zrušiť
          </Button>
          <Button
            onClick={event => this.handleClick(event, {
              ...this.state,
              theme: {
                id: this.props.themePicker.theme,
                inverted: this.props.themePicker.inverted
              }
            })}
            color="secondary"
            disabled={this.props.title.length < dashboardConfig.MIN_LENGTH || this.props.isDashboardLoading}
          >
            Vytvoriť
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NewDashboardDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
  handleTitleChange: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  themePicker: themePickerPropTypes.themePicker.isRequired,
  resetThemePicker: propTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    resetThemePicker: () => dispatch(resetThemePicker())
  }
}

const mapStateToProps = state => {
  return {
    isDashboardLoading: state.dashboard.isLoading,
    themePicker: state.themePicker
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDashboardDialog);