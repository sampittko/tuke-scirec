import {Typography} from '@material-ui/core';
import propTypes from 'prop-types';
import React from 'react';
import './Counter.scss';

class Counter extends React.Component {
  getProjectVersionWord = () => {
    if (this.props.projectVersionsCount >= 5) {
      return "verzií";
    } else if (this.props.projectVersionsCount >= 2) {
      return "verzie";
    } else {
      return "verzia";
    }
  };

  render() {
    return (
      <Typography className="project-versions-list-counter">
        {`${this.props.projectVersionsCount} ${this.getProjectVersionWord()}`}
      </Typography>
    );
  }
}

Counter.propTypes = {
  projectVersionsCount: propTypes.number.isRequired,
};

export default Counter;