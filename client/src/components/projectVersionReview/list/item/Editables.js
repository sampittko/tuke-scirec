import React from 'react';
import propTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const Editables = props =>
  <div style={{opacity: 0.7}}>
    <TextField
      label="Recenzent"
      name="reviewer"
      onChange={props.onChange}
      InputProps={{readOnly: false}}
      value={props.state}
      fullWidth
    />
    <TextField
      label="Poznámky"
      name="notes"
      onChange={props.onChange}
      InputProps={{readOnly: false}}
      value={props.notes}
      rows={4}
      rowsMax={4}
      multiline
      fullWidth
    />
  </div>;

Editables.propTypes = {
  reviewer: propTypes.string.isRequired,
  notes: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Editables;