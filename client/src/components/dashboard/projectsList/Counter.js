import {Typography} from '@material-ui/core';
import propTypes from 'prop-types';
import React from 'react';
import './Counter.scss';

class Counter extends React.Component {
  getProjectWord = () => {
    if (this.props.projectsCount >= 5) {
      return "projektov";
    } else if (this.props.projectsCount >= 2) {
      return "projekty";
    } else {
      return "projekt";
    }
  };

  render() {
    return (
      <Typography className="projects-list-counter">
        {`${this.props.projectsCount} ${this.getProjectWord()}`}
      </Typography>
    );
  }
}

Counter.propTypes = {
  projectsCount: propTypes.number.isRequired,
};

export default Counter;