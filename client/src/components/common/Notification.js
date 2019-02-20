import React from 'react';
import { Snackbar } from '@material-ui/core';
import propTypes from 'prop-types';
import { timeouts } from '../../config/app/ui';

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
        autoHideDuration={timeouts.NOTIFICATION}
      />
    )
  }
}

Notification.propTypes = {
  message: propTypes.string.isRequired
}

export default Notification;