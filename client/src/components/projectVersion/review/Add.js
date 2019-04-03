import React from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './Add.scss';

class Add extends React.Component {
  render() {
    return (
      <div className="add-project-version-review">
        <Tooltip title="Pridať nový posudok" placement="bottom">
          <IconButton>
            <AddCircleOutlineIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

Add.propTypes = {};

export default Add;