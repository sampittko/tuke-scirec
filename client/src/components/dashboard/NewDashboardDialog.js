import React from 'react';
import propTypes from 'prop-types';
import { FormControl, Dialog, DialogTitle, DialogContent, Input, DialogActions, Button, InputAdornment, DialogContentText, InputLabel, Checkbox, FormControlLabel } from '@material-ui/core';
import { dashboard } from '../../config/app';
import { connect } from 'react-redux';
import './NewDashboardDialog.scss';

class NewDashboardDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      default: false
    }
  }

  handleNameChange = event => {
    if (this.state.name.length !== dashboard.MAX_LENGTH || event.target.value.length < dashboard.MAX_LENGTH) {
      this.setState({
        name: event.target.value
      });
    }
  }

  handleDefaultChange = () => {
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
            Pre vytvorenie novej nástenky zadajte nižšie jej názov pričom jeho dĺžka musí byť od {dashboard.MIN_LENGTH} do {dashboard.MAX_LENGTH} znakov. Maximálny počet násteniek je {dashboard.MAX_COUNT}.
          </DialogContentText>
          <FormControl>
            <InputLabel>
              Názov nástenky
            </InputLabel>
            <Input
              autoFocus
              value={this.state.name}
              endAdornment={<InputAdornment position="end">{this.state.name.length}/{dashboard.MAX_LENGTH}</InputAdornment>}
              type="text"
              fullWidth
              onChange={this.handleNameChange}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(this.state.default)}
                onChange={this.handleDefaultChange}
                value={this.state.default ? "true" : "false"}
                color="primary"
              />
            }
            label="Nastaviť ako predvolenú nástenku"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onClick}
            color="primary"
            disabled={this.props.isLoading}
          >
            Zrušiť
          </Button>
          <Button
            onClick={() => this.props.createDashboard(this.state)}
            color="secondary"
            disabled={this.state.name.length < dashboard.MIN_LENGTH || this.props.isLoading}
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
  isLoading: propTypes.bool.isRequired,
  createDashboard: propTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    isLoading: state.dashboard.isLoading
  }
}

export default connect(mapStateToProps)(NewDashboardDialog);