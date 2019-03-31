import React from 'react';
import {List} from "@material-ui/core";
import propTypes from 'prop-types';
import './List.scss';

const ListComponent = props =>
  <List className="list">
    {props.children}
  </List>;

ListComponent.propTypes = {
  children: propTypes.arrayOf(propTypes.object).isRequired,
};

export default ListComponent;