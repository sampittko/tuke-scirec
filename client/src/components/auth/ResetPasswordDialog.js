import DialogTransition from "../common/DialogTransition";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@material-ui/core";
import React from "react";
import propTypes from 'prop-types';
import {connect} from "react-redux";
import {resetPassword} from "../../store/actions/authActions";

class ResetPasswordDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
  }

  handleChange = event => {
    this.setState({
      email: event.target.value,
    })
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.resetPassword(this.state.email);
    this.setState({
      email: '',
    });
    this.props.onSent();
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={DialogTransition}
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle>Obnovenie hesla</DialogTitle>
          <DialogContent>
            <Typography>
              Ak si prajete obnoviť heslo pre svoj účet, vyplňte e-mail v poli nižšie.
            </Typography>
            <TextField
              label="E-mail"
              type="email"
              name="email"
              margin="normal"
              autoComplete="email"
              onChange={this.handleChange}
              value={this.state.email}
              autoFocus
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.onClick}
              type="button"
            >
              Zrušiť
            </Button>
            <Button type="submit" color="secondary">
              Obnoviť heslo
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

ResetPasswordDialog.propTypes = {
  resetPassword: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
  onSent: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: email => dispatch(resetPassword(email)),
  }
};

export default connect(null, mapDispatchToProps)(ResetPasswordDialog);