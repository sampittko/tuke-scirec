import React from 'react';
import propTypes from 'prop-types';
import {Paper} from "@material-ui/core";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import './Overview.scss';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      readOnly: true,
    }
  }

  render() {
    return (
      <div className="overview">
        <Typography
          variant="h6"
          className="page-title"
        >
          Prehľad
        </Typography>
        <Paper className="paper">
          <TextField
            label="Stav projektu"
            InputProps={{readOnly: this.state.readOnly}}
            defaultValue="nešpecifikované"
            className="input"
            fullWidth
          />
          <TextField
            label="Termín odovzdania"
            InputProps={{readOnly: this.state.readOnly}}
            defaultValue="2012-03-02"
            className="input"
            fullWidth
            id="date"
            type="date"
            InputLabelProps={{shrink: true}}
          />
          <TextField
            label="Adresát"
            InputProps={{readOnly: this.state.readOnly}}
            defaultValue="nešpecifikované"
            className="input"
            fullWidth
          />
          <TextField
            label="Popis"
            InputProps={{readOnly: this.state.readOnly}}
            defaultValue="nešpecifikované"
            className="input"
            rows={4}
            rowsMax={4}
            multiline
            fullWidth
          />
        </Paper>
      </div>
    );
  }
}

Overview.propTypes = {
  activeProject: propTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    activeProject: state.project.data.active,
  }
};

export default connect(mapStateToProps)(Overview);