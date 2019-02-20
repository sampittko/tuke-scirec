import React from 'react';
import { Snackbar } from '@material-ui/core';
import propTypes from 'prop-types';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={this.state.open}
        message={this.props.message}
        onClose={this.handleClose}
        autoHideDuration={2000}
      />
    )
  }
}

Notification.propTypes = {
  message: propTypes.string.isRequired
}

export default Notification;