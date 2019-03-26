import React from 'react';
import propTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import {projectConfig} from "../../../config/app";
import {getReadableProjectState} from "../../../utils/projectUtils";

const projectStates = [
  {value: projectConfig.states.values.NOT_SET},
  {value: projectConfig.states.values.PENDING},
  {value: projectConfig.states.values.FINISHED},
];

const Editables = props =>
  <div style={{opacity: 0.7}}>
    <TextField
      select
      label="Stav projektu"
      name="state"
      onChange={props.onChange}
      InputProps={{readOnly: false}}
      value={props.state}
      className="input"
      fullWidth
    >
      {projectStates.map(state => (
        <MenuItem key={state.value} value={state.value}>
          {getReadableProjectState(state.value)}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      label="Termín odovzdania"
      name="deadline"
      onChange={props.onChange}
      InputProps={{readOnly: false}}
      value={props.deadline}
      className="input"
      fullWidth
      type="date"
      InputLabelProps={{shrink: true}}
    />
    <TextField
      label="Adresát"
      name="recipient"
      onChange={props.onChange}
      InputProps={{readOnly: false}}
      value={props.recipient}
      className="input"
      fullWidth
    />
    <TextField
      label="Popis"
      name="description"
      onChange={props.onChange}
      InputProps={{readOnly: false}}
      value={props.description}
      className="input"
      rows={7}
      rowsMax={7}
      multiline
      fullWidth
    />
  </div>;

Editables.propTypes = {
  state: propTypes.number.isRequired,
  deadline: propTypes.string.isRequired,
  recipient: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Editables;