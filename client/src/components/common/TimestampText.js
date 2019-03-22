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
    let text = `${this.getHoursFromDate()}:${this.getMinutesFromDate()}, ${this.getDMYFromDate()}`;
    if (this.props.frontText && this.props.endText) {
      return `${this.props.frontText} ${this.props.endText} ${this.props.endText}`;
    }
    else if (this.props.frontText && !this.props.endText) {
      return `${this.props.frontText} ${text}`;
    }
    else if (!this.props.frontText && this.props.endText) {
      return `${text} ${this.props.endText}`;
    }
    else {
      return text;
    }
  }
}

TimestampText.propTypes = {
  timestamp: propTypes.object.isRequired,
  frontText: propTypes.string,
  endText: propTypes.string,
};

export default TimestampText;