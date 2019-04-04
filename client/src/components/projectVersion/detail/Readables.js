import React from 'react';
import propTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import File from "../../file";
import {getReadableProjectVersionState} from "../../../utils/projectVersionUtils";

const Readables = props =>
  <div>
    <TextField
      label="Stav verzie"
      name="state"
      InputProps={{readOnly: true}}
      value={getReadableProjectVersionState(props.state)}
      fullWidth
      disabled
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
    <File/>
  </div>;

Readables.propTypes = {
  state: propTypes.number.isRequired,
  notes: propTypes.string.isRequired,
};

export default Readables;