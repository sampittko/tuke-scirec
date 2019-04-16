import './NewDialog.scss';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider} from '@material-ui/core';

import DialogTransition from '../common/DialogTransition';
import React from 'react';
import Switch from '../common/Switch';
import ThemePicker from '../themePicker';
import {connect} from 'react-redux';
import {dashboardConfig} from '../../config/app';
import propTypes from 'prop-types';
import {resetThemePicker} from '../../store/actions/themePickerActions';
import StringInput from "../common/StringInput";

class NewDialog extends React.Component {
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
  };

  handleChange = () => {
    this.setState({
      default: !this.state.default
    });
  };

  handleSubmit = () => {
    this.handleClick(null, {
      ...this.state,
      theme: {
        id: this.props.themePicker.theme,
        inverted: this.props.themePicker.inverted
      }
    })
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={DialogTransition}
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle>Vytvorenie novej nástenky</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pre vytvorenie novej nástenky zadajte nižšie jej názov pričom jeho dĺžka musí byť od {dashboardConfig.MIN_LENGTH} do {dashboardConfig.MAX_LENGTH} znakov. Maximálny počet násteniek je {dashboardConfig.MAX_COUNT}.
            </DialogContentText>
            <StringInput
              required
              onChange={this.props.handleTitleChange}
              label="Názov nástenky"
              maxLength={dashboardConfig.MAX_LENGTH}
              value={this.props.title}
            />
            <Switch
              checked={this.state.default}
              onChange={this.handleChange}
              label="Nastaviť ako predvolenú nástenku"
            />
            <Divider />
            <ThemePicker />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClick}
              color="primary"
              disabled={this.props.isDashboardLoading}
              type="button"
            >
              Zrušiť
            </Button>
            <Button
              type="submit"
              color="secondary"
              disabled={this.props.title.length < dashboardConfig.MIN_LENGTH || this.props.isDashboardLoading}
            >
              Vytvoriť
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

NewDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
  isDashboardLoading: propTypes.bool.isRequired,
  handleTitleChange: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  themePicker: propTypes.object.isRequired,
  resetThemePicker: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    resetThemePicker: () => dispatch(resetThemePicker())
  }
};

const mapStateToProps = state => {
  return {
    isDashboardLoading: state.dashboard.isLoading,
    themePicker: state.themePicker
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDialog);