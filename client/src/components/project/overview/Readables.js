import React from 'react';
import propTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import {getReadableProjectState} from "../../../utils/projectUtils";

const Readables = props =>
  <div>
    <TextField
      label="Stav projektu"
      InputProps={{readOnly: true}}
      value={getReadableProjectState(props.state)}
      disabled
      fullWidth
    />
    <TextField
      label="Termín odovzdania"
      InputProps={{readOnly: true}}
      value={props.deadline}
      fullWidth
      type="date"
      disabled
      InputLabelProps={{shrink: true}}
    />
    <TextField
      label="Adresát"
      InputProps={{readOnly: true}}
      value={props.recipient}
      disabled
      fullWidth
    />
    <TextField
      label="Popis"
      InputProps={{readOnly: true}}
      value={props.description}
      rows={7}
      rowsMax={7}
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