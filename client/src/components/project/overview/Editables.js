import React from 'react';
import propTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import {projectConfig} from "../../../config/app";
import {getReadableProjectState} from "../../../utils/projectUtils";
import {Checkbox, FormControl, Input, InputAdornment, InputLabel, Tooltip} from "@material-ui/core";
import StringInput from "../../common/StringInput";

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
      value={props.state}
      fullWidth
    >
      {projectStates.map(state => (
        <MenuItem key={state.value} value={state.value}>
          {getReadableProjectState(state.value)}
        </MenuItem>
      ))}
    </TextField>
    <FormControl className="full-width">
      <InputLabel shrink>
        Termín odovzdania
      </InputLabel>
      <Input
        name="deadline"
        value={props.deadline}
        endAdornment={(
          <InputAdornment position="end">
            <Tooltip
              title="Zobrazovať pole"
              placement="top"
            >
              <Checkbox
                checked={Boolean(props.deadlineVisible)}
                value={props.deadlineVisible ? "true" : "false"}
                color="default"
                name="deadlineVisible"
                onChange={props.onChange}
              />
            </Tooltip>
          </InputAdornment>
        )}
        type="date"
        fullWidth
        onChange={props.onChange}
      />
    </FormControl>
    <TextField
      label="Adresát"
      name="recipient"
      onChange={props.onChange}
      value={props.recipient}
      fullWidth
    />
    <StringInput
      label="Popis"
      onChange={props.onChange}
      maxLength={projectConfig.MAX_DESCRIPTION_LENGTH}
      value={props.description}
      name="description"
      multiline
      rowsMax={7}
      rows={7}
    />
  </div>;

Editables.propTypes = {
  state: propTypes.number.isRequired,
  deadline: propTypes.string.isRequired,
  recipient: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  deadlineVisible: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Editables;