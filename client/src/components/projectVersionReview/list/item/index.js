import React from 'react';
import ExpansionPanel from '../../../common/ExpansionPanel';
import propTypes from 'prop-types';
import PaperActions from "../../../common/PaperActions";
import Editables from "./Editables";
import Readables from "./Readables";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: props.projectVersionReview.data().notes,
      reviewer: props.projectVersionReview.data().reviewer,
      editMode: false,
      open: false,
      notify: false,
    }
  }

  settingsChanged = () => {
    return this.state.notes !== this.props.projectVersionReview.data().notes || this.state.reviewer !== this.props.projectVersionReview.data().reviewer;
  };

  handleClick = async (event, action) => {
    switch (action) {
      case 'edit':
        this.setState({
          editMode: true,
        });
        break;
      case 'save':
        // await this.props.updateProjectVersionReview({
        //   reviewer: this.state.reviewer,
        //   notes: this.state.notes,
        // });
        this.setState({
          notify: true,
          editMode: false,
        });
        break;
      case 'cancel':
        this.setState((prevState, props) => ({
          editMode: false,
          reviewer: props.projectVersionReview.data().reviewer,
          notes: props.projectVersionReview.data().notes,
        }));
        break;
      case 'delete':
        this.setState({
          open: true,
        });
        console.log('delete me');
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

  render() {
    return (
      <ExpansionPanel
        expanded={this.props.expanded}
        onChange={this.handleExpansionPanelChange}
        panelContent={(
          <div>
            {this.state.editMode ? (
              <Editables
                notes={this.state.notes}
                reviewer={this.state.reviewer}
                onChange={this.handleFormChange}
              />
            ) : (
              <Readables
                notes={this.state.notes}
                reviewer={this.state.reviewer}
              />
            )}
          </div>
        )}
        panelActions={(
          <PaperActions
            relative
            deleteVisible
            editMode={this.state.editMode}
            onClick={(event, action) => this.handleClick(event, action)}
            settingsChanged={this.settingsChanged}
          />
        )}
        title={`Posudok ${this.props.index + 1}`}
      />
    )
  }
}

Item.propTypes = {
  index: propTypes.number.isRequired,
  projectVersionReview: propTypes.object.isRequired,
  expanded: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Item;