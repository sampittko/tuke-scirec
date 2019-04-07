import React from 'react';
import './Add.scss';
import propTypes from 'prop-types';
import Button from "@material-ui/core/Button";

const Add = props =>
  <div className="add-file">
    <Button
      size="small"
      onClick={props.onClick}
    >
      Pridať súbory
    </Button>
  </div>;

Add.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default Add;