import React from 'react';
import propTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import File from "../../../file";

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
      rows={7}
      rowsMax={7}
      multiline
      fullWidth
    />
    <File ownerEntity={props.filesOwnerEntity} editable/>
  </div>;

Editables.propTypes = {
  reviewer: propTypes.string.isRequired,
  notes: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  filesOwnerEntity: propTypes.object.isRequired,
};

export default Editables;