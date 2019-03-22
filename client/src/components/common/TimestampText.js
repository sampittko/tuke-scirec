import React from 'react';
import propTypes from 'prop-types';

class TimestampText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(props.timestamp.toDate()),
    }
  }

  getDMYFromDate = () => {
    const day = this.state.date.getDate();
    const month = this.state.date.getMonth() + 1;
    const year = this.state.date.getFullYear();
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
  };

  getHoursFromDate = () => {
    const hours = this.state.date.getHours();
    return hours < 10 ? `0${hours}` : hours;
  };

  getMinutesFromDate = () => {
    const minutes = this.state.date.getMinutes();
    return minutes < 10 ? `0${minutes}` : minutes;
  };

  render() {
    return `Naposledy upravené: ${this.getHoursFromDate()}:${this.getMinutesFromDate()}, ${this.getDMYFromDate()}`;
  }
}

TimestampText.propTypes = {
  timestamp: propTypes.object.isRequired,
};

export default TimestampText;