import {Typography} from '@material-ui/core';
import propTypes from 'prop-types';
import React from 'react';
import './Counter.scss';

class Counter extends React.Component {
  getReviewWord = () => {
    if (this.props.reviewsCount >= 5) {
      return "posudkov";
    } else if (this.props.reviewsCount >= 2) {
      return "posudky";
    } else {
      return "posudok";
    }
  };

  render() {
    return (
      <Typography className="review-counter">
        {`${this.props.reviewsCount} ${this.getReviewWord()}`}
      </Typography>
    );
  }
}

Counter.propTypes = {
  reviewsCount: propTypes.number.isRequired,
};

export default Counter;