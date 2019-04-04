import React from 'react';
import propTypes from 'prop-types'
import ListItem from "./Item";

const ListComponent = props =>
  <div>
    {/*{props.projectVersionReviews.map(projectVersionReview => (*/}
    <ListItem
      expanded={props.expandedPanel === 1}
      onChange={(event) => props.onChange(event, 1)}
    />
    {/*))}*/}
  </div>;

ListComponent.propTypes = {
  projectVersionReviews: propTypes.arrayOf(propTypes.object),
  onChange: propTypes.func.isRequired,
  expandedPanel: propTypes.number.isRequired,
};

export default ListComponent;