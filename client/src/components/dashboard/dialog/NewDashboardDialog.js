import React from 'react';
import propTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@material-ui/core';
import { invertTheme, resetThemePicker } from '../../../store/actions/themePickerActions';
import ThemePicker from '../../themePicker/ThemePicker';
import NameInput from './content/NameInput';
import Switch from './content/Switch';
import { dashboardConfig } from '../../../config/app';
import { connect } from 'react-redux';
import './NewDashboardDialog.scss';

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
          <NameInput
            name={this.props.name}
            onChange={this.props.handleNameChange}
          />
          <ThemePicker />
          <Switch
            checked={this.props.themePicker.inverted}
            onChange={this.props.invertTheme}
            label="Invertovať farby"
          />
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
            disabled={this.props.name.length < dashboardConfig.MIN_LENGTH || this.props.isDashboardLoading}
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
  isDashboardLoading: propTypes.bool.isRequired,
  handleNameChange: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  invertTheme: propTypes.func.isRequired,
  themePicker: propTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    invertTheme: () => dispatch(invertTheme()),
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