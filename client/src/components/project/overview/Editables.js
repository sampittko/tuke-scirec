import React from 'react';
import propTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import {projectConfig} from "../../../config/app";
import {getReadableProjectState} from "../../../utils/projectUtils";
import {Checkbox, FormControl, IconButton, Input, InputAdornment, InputLabel, Tooltip} from "@material-ui/core";
import StringInput from "../../common/StringInput";
import AlertCircleOutlineIcon from 'mdi-material-ui/AlertCircleOutline'

const projectStates = [
  {value: projectConfig.states.values.NOT_SET},
  {value: projectConfig.states.values.PENDING},
  {value: projectConfig.states.values.FINISHED},
];

const Editables = props =>
  <div style={{opacity: 0.7}}>
    <TextField
      select
      label={
        <div>
          Stav projektu
          <Tooltip title="Stav projektu pomáha sprehľadniť formu zobrazovania projektov na nástenke" placement="right">
            <IconButton
              style={{cursor: "default", position: "absolute", top: "-15px"}}
              disableRipple
            >
              <AlertCircleOutlineIcon/>
            </IconButton>
          </Tooltip>
        </div>
      }
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
        <div>
          Termín odovzdania
          <Tooltip title="Termín odovzdania má len informačný charakter a nemusí ho mať každý projekt"
                   placement="right">
            <IconButton
              style={{cursor: "default", position: "absolute", top: "-15px"}}
              disableRipple
            >
              <AlertCircleOutlineIcon/>
            </IconButton>
          </Tooltip>
        </div>
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
      label={
        <div>
          Adresát
          <Tooltip title="Adresáta predstavuje zvyčajne organizácia, kde bude projekt publikovaný" placement="right">
            <IconButton
              style={{cursor: "default", position: "absolute", top: "-15px"}}
              disableRipple
            >
              <AlertCircleOutlineIcon/>
            </IconButton>
          </Tooltip>
        </div>
      }
      name="recipient"
      onChange={props.onChange}
      value={props.recipient}
      fullWidth
    />
    <StringInput
      label={
        <div>
          Popis
          <Tooltip title="Popis je ľubovolný text, ktorým môže byť napríklad aj znenie zadania" placement="right">
            <IconButton
              style={{cursor: "default", position: "absolute", top: "-15px"}}
              disableRipple
            >
              <AlertCircleOutlineIcon/>
            </IconButton>
          </Tooltip>
        </div>
      }
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