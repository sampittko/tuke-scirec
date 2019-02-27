import React from 'react';
import { Snackbar } from '@material-ui/core';
import propTypes from 'prop-types';
import { timeouts } from '../../config/mui';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  handleClose = (event, reason) => {
    if (reason !== "clickaway") {
      this.setState({
        open: false
      });
    }
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={this.state.open}
        message={this.props.message}
        onClose={(event, reason) => this.handleClose(event, reason)}
        autoHideDuration={timeouts.NOTIFICATION}
      />
    )
  }
}

Notification.propTypes = {
  message: propTypes.string.isRequired
}

export default Notification;