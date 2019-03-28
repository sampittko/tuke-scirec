import React from 'react';
import propTypes from 'prop-types';
import File from "../file";
import TextField from "@material-ui/core/TextField";

const Editables = props =>
  <div style={{opacity: 0.7}}>
    <TextField
      label="Recenzenti"
      name="notes"
      onChange={props.onChange}
      InputProps={{readOnly: false}}
      value={props.reviewers}
      fullWidth
    />
    <TextField
      label="Poznámky"
      name="notes"
      InputProps={{readOnly: true}}
      value={props.notes}
      rows={7}
      rowsMax={7}
      multiline
      fullWidth
      disabled
    />
    <File editable/>
  </div>;

Editables.propTypes = {
  reviewers: propTypes.string.isRequired,
  notes: propTypes.string.isRequired,
};

export default Editables;