import React from 'react';
import ExpansionPanel from '../../../common/ExpansionPanel';
import propTypes from 'prop-types';
import PaperActions from "../../../common/PaperActions";
import Editables from "./Editables";
import Readables from "./Readables";
import {updateProjectVersionReview} from "../../../../store/actions/projectVersionReviewActions";
import {connect} from "react-redux";
import DeleteConfirmDialog from "../../DeleteConfirmDialog";
import File from "../../../file";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: props.projectVersionReview.data().notes,
      editMode: false,
      open: false,
    }
  }

  settingsChanged = () => {
    return this.state.notes !== this.props.projectVersionReview.data().notes;
  };

  handleClick = async (event, action) => {
    switch (action) {
      case 'edit':
        this.setState({
          editMode: true,
        });
        break;
      case 'save':
        await this.props.updateProjectVersionReview({
          notes: this.state.notes,
        }, this.props.projectVersionReview);
        this.setState({
          editMode: false,
        });
        this.props.onSave();
        break;
      case 'cancel':
        this.setState((prevState, props) => ({
          editMode: false,
          notes: props.projectVersionReview.data().notes,
        }));
        break;
      case 'delete':
        this.setState({
          open: true,
        });
        break;
      default:
        console.log("Bad action");
        break;
    }
  };

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  };

  handleExpansionPanelChange = event => {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
      })
    }
    this.props.onChange(event, this.props.index);
  };

  handleDialogClick = () => {
    this.setState({
      open: false,
    })
  };

  render() {
    return (
      <div>
        <ExpansionPanel
          updating={this.props.isProjectVersionReviewUpdating}
          expanded={this.props.expanded}
          onChange={this.handleExpansionPanelChange}
          panelContent={(
            <div>
              {this.state.editMode ? (
                <Editables
                  notes={this.state.notes}
                  onChange={this.handleFormChange}
                />
              ) : (
                <Readables notes={this.state.notes}/>
              )}
              <File
                ownerEntity={this.props.projectVersionReview}
                filesIndex={this.props.filesIndex}
                editable={this.state.editMode}
              />
            </div>
          )}
          panelActions={(
            <PaperActions
              updating={this.props.isProjectVersionReviewUpdating}
              relative
              deleteVisible={this.state.editMode && this.props.expanded}
              editMode={this.state.editMode}
              onClick={(event, action) => this.handleClick(event, action)}
              settingsChanged={this.settingsChanged}
            />
          )}
          title={`Posudok ${this.props.index + 1}`}
        />
        <DeleteConfirmDialog
          open={this.state.open}
          onClick={this.handleDialogClick}
          filesIndex={this.props.filesIndex}
          projectVersionReview={this.props.projectVersionReview}
        />
      </div>
    )
  }
}


Item.propTypes = {
  index: propTypes.number.isRequired,
  projectVersionReview: propTypes.object.isRequired,
  expanded: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
  onSave: propTypes.func.isRequired,
  updateProjectVersionReview: propTypes.func.isRequired,
  isProjectVersionReviewUpdating: propTypes.bool.isRequired,
  filesIndex: propTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    updateProjectVersionReview: async (data, projectVersionReview) => dispatch(updateProjectVersionReview(data, projectVersionReview)),
  }
};

const mapStateToProps = state => {
  return {
    isProjectVersionReviewUpdating: state.projectVersionReview.isUpdating,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);