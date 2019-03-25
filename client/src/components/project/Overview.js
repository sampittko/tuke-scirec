import React from 'react';
import propTypes from 'prop-types';
import {IconButton, Paper, Tooltip} from "@material-ui/core";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import './Overview.scss';
import {updateProject} from "../../store/actions/projectActions";
import Notification from "../common/Notification";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      changesSaved: false,
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
        await this.props.updateProject({
          state: this.state.state,
          deadline: this.state.deadline,
          recipient: this.state.recipient,
          description: this.state.description,
        });
        this.setState({
          changesSaved: true,
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
          <div className={this.state.editMode ? "editables" : "readables"}>
            <TextField
              label="Stav projektu"
              name="state"
              onChange={this.handleChange}
              InputProps={{readOnly: !this.state.editMode}}
              value={this.state.state}
              className="input"
              fullWidth
            />
            <TextField
              label="Termín odovzdania"
              name="deadline"
              onChange={this.handleChange}
              InputProps={{readOnly: !this.state.editMode}}
              value={this.state.deadline}
              className="input"
              fullWidth
              type="date"
              InputLabelProps={{shrink: true}}
            />
            <TextField
              label="Adresát"
              name="recipient"
              onChange={this.handleChange}
              InputProps={{readOnly: !this.state.editMode}}
              value={this.state.recipient}
              className="input"
              fullWidth
            />
            <TextField
              label="Popis"
              name="description"
              onChange={this.handleChange}
              InputProps={{readOnly: !this.state.editMode}}
              value={this.state.description}
              className="input"
              rowsMax={4}
              multiline
              fullWidth
            />
          </div>
          <div className="action-buttons">
            {this.state.editMode ? (
              <div>
                <Tooltip
                  title="Zrušiť úpravy"
                  placement="left"
                  disableFocusListener
                >
                  <IconButton onClick={(event) => this.handleClick(event, 'cancel')}>
                    <CloseIcon fontSize="small"/>
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Uložiť zmeny"
                  placement="left"
                  disableFocusListener
                >
                  <div style={{display: 'inline'}}>
                    <IconButton
                      onClick={(event) => this.handleClick(event, 'save')}
                      disabled={!this.settingsChanged()}
                    >
                      <SaveIcon fontSize="small"/>
                    </IconButton>
                  </div>
                </Tooltip>
              </div>
            ) : (
              <Tooltip
                title="Upraviť prehľad projektu"
                placement="left"
                disableFocusListener
              >
                <IconButton onClick={(event) => this.handleClick(event, 'edit')}>
                  <EditIcon fontSize="small"/>
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Paper>
        {this.state.changesSaved && <Notification message="Zmeny boli uložené"/>}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.changesSaved) {
      this.setState({
        changesSaved: false,
      })
    }
  }
}

Overview.propTypes = {
  activeProject: propTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    updateProject: async (data) => dispatch(updateProject(data)),
  }
};

const mapStateToProps = state => {
  return {
    activeProject: state.project.data.active,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);