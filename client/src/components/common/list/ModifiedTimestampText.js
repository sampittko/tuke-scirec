import React from 'react';
import propTypes from 'prop-types';

class ModifiedTimestampText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(props.modifiedTimestamp.toDate()),
    }
  }

  getDMYFromDate = () => {
    const day = this.state.date.getDate();
    const month = this.state.date.getMonth() + 1;
    const year = this.state.date.getFullYear();
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
  };

  getMinutesFromDate = () => {
    const minutes = this.state.date.getMinutes();
    return minutes < 10 ? `0${minutes}` : minutes;
  };

  getHoursFromDate = () => {
    const hours = this.state.date.getHours();
    return hours < 10 ? `0${hours}` : hours;
  };

  render() {
    let formattedTimestamp = `${this.getHoursFromDate()}:${this.getMinutesFromDate()}, ${this.getDMYFromDate()}`;
    return `Naposledy upravené: ${formattedTimestamp}`;
  }
}

ModifiedTimestampText.propTypes = {
  modifiedTimestamp: propTypes.object.isRequired,
};

export default ModifiedTimestampText;