import React from 'react';
import propTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";

const Readables = props =>
  <div>
    <TextField
      label="Stav projektu"
      name="state"
      InputProps={{readOnly: true}}
      value={props.state}
      className="input"
      disabled
      fullWidth
    />
    <TextField
      label="Termín odovzdania"
      name="deadline"
      InputProps={{readOnly: true}}
      value={props.deadline}
      className="input"
      fullWidth
      type="date"
      disabled
      InputLabelProps={{shrink: true}}
    />
    <TextField
      label="Adresát"
      name="recipient"
      InputProps={{readOnly: true}}
      value={props.recipient}
      disabled
      className="input"
      fullWidth
    />
    <TextField
      label="Popis"
      name="description"
      InputProps={{readOnly: true}}
      value={props.description}
      className="input"
      rowsMax={8}
      disabled
      multiline
      fullWidth
    />
  </div>;

Readables.propTypes = {
  state: propTypes.number.isRequired,
  deadline: propTypes.string.isRequired,
  recipient: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
};

export default Readables;