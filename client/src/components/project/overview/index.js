import React from 'react';
import propTypes from 'prop-types';
import {Paper, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import './index.scss';
import {updateProjectOverview} from "../../../store/actions/projectActions";
import Notification from "../../common/Notification";
import Editables from "./Editables";
import Readables from "./Readables";
import PaperActions from "../../common/PaperActions";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      notify: false,
      state: props.activeProject.data().state,
      deadline: props.activeProject.data().deadline,
      recipient: props.activeProject.data().recipient,
      description: props.activeProject.data().description,
    }
  }

  settingsChanged = () => {
    return this.props.activeProject.data().state !== this.state.state ||
      this.props.activeProject.data().deadline !== this.state.deadline ||
      this.props.activeProject.data().recipient !== this.state.recipient ||
      this.props.activeProject.data().description !== this.state.description
  };

  handleClick = async (event, action) => {
    switch (action) {
      case 'edit':
        this.setState({
          editMode: true,
        });
        break;
      case 'save':
        await this.props.updateProjectOverview({
          state: this.state.state,
          deadline: this.state.deadline,
          recipient: this.state.recipient,
          description: this.state.description,
        });
        this.setState({
          notify: true,
          editMode: false,
        });
        break;
      case 'cancel':
        this.setState((prevState, props) => ({
          editMode: false,
          state: props.activeProject.data().state,
          deadline: props.activeProject.data().deadline,
          recipient: props.activeProject.data().recipient,
          description: props.activeProject.data().description,
        }));
        break;
      default:
        console.log("Bad action");
        break;
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  };

  handleClose = () => {
    this.setState({
      notify: false,
    })
  };

  render() {
    return (
      <div className="overview">
        <Typography variant="h6" className="page-title">
          Prehľad
        </Typography>
        <Paper className="paper">
          {this.state.editMode ? (
            <Editables
              state={this.state.state}
              deadline={this.state.deadline}
              recipient={this.state.recipient}
              description={this.state.description}
              onChange={this.handleChange}
            />
          ) : (
            <Readables
              state={this.state.state}
              deadline={this.state.deadline}
              recipient={this.state.recipient}
              description={this.state.description}
            />
          )}
          <TextField
            style={this.state.editMode ? {opacity: 0.7} : {}}
            label="Počet verzií projektu"
            InputProps={{readOnly: true}}
            value={this.props.activeProject.data().versionsCount}
            className="input"
            disabled
            InputLabelProps={{shrink: true}}
          />
          <PaperActions
            deleteVisible={false}
            editMode={this.state.editMode}
            onClick={(event, action) => this.handleClick(event, action)}
            settingsChanged={this.settingsChanged}
          />
        </Paper>
        {this.state.notify && (
          <Notification
            message="Zmeny boli úspešne uložené"
            onClose={this.handleClose}
          />
        )}
      </div>
    );
  }
}

Overview.propTypes = {
  activeProject: propTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    updateProjectOverview: async (data) => dispatch(updateProjectOverview(data)),
  }
};

const mapStateToProps = state => {
  return {
    activeProject: state.project.data.active,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);