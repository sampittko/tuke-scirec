import React from 'react';
import propTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";

const Readables = props =>
  <div>
    <TextField
      label="Recenzent"
      name="reviewer"
      InputProps={{readOnly: true}}
      value={props.reviewer}
      fullWidth
      disabled
    />
    <TextField
      label="Poznámky"
      name="notes"
      InputProps={{readOnly: true}}
      value={props.notes}
      rows={4}
      rowsMax={4}
      multiline
      fullWidth
      disabled
    />
  </div>;

Readables.propTypes = {
  reviewer: propTypes.string.isRequired,
  notes: propTypes.string.isRequired,
};

export default Readables;