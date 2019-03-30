import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import './index.scss';
import EditModeActionButtons from "../../common/EditModeActionButtons";
import Editables from "./Editables";
import Readables from "./Readables";
import {projectVersionConfig} from "../../../config/app";
import {connect} from "react-redux";
import projectVersionPropTypes from '../../../propTypes/projectVersionPropTypes';
import Loader from "../../common/Loader";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      changesSaved: false,
      state: projectVersionConfig.states.values.NOT_SET,
      notes: "",
    }
  }

  // TODO
  settingsChanged = () => {
    // return this.props.activeProject.data().state !== this.state.state ||
    //   this.props.activeProject.data().deadline !== this.state.deadline ||
    //   this.props.activeProject.data().recipient !== this.state.recipient ||
    //   this.props.activeProject.data().description !== this.state.description
    return false;
  };

  handleClick = async (event, action) => {
    switch (action) {
      case 'edit':
        this.setState({
          editMode: true,
        });
        break;
      case 'save':
        // TODO
        this.setState({
          changesSaved: true,
          editMode: false,
        });
        break;
      case 'cancel':
        // TODO
        this.setState({
          editMode: false,
        });
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
      <div className="project-version-detail">
        <Typography variant={this.props.latest ? "body1" : "h6"} className="page-title">Detail</Typography>
        <Paper className={`paper ${this.props.isProjectVersionLoading ? 'paddingless' : ''}`}>
          {!this.props.isProjectVersionLoading ? (
            <div>
              {this.state.editMode ? (
                <Editables
                  state={this.state.state}
                  notes={this.state.notes}
                  onChange={this.handleChange}
                />
              ) : (
                <Readables
                  state={this.state.state}
                  notes={this.state.notes}
                />
              )}
              <EditModeActionButtons
                editMode={this.state.editMode}
                settingsChanged={this.settingsChanged}
                onClick={(event, action) => this.handleClick(event, action)}
              />
            </div>
          ) : (
            <Loader/>
          )}
        </Paper>
      </div>
    )
  }
}

Detail.propTypes = {
  latest: propTypes.bool,
  isProjectVersionLoading: projectVersionPropTypes.isLoading.isRequired,
};

const mapStateToProps = state => {
  return {
    isProjectVersionLoading: state.projectVersion.isLoading,
  }
};

export default connect(mapStateToProps)(Detail);