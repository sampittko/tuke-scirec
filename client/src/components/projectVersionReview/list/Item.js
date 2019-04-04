import React from 'react';
import ExpansionPanel from '../../common/ExpansionPanel';
import propTypes from 'prop-types';
import PaperActions from "../../common/PaperActions";
import File from "../../file";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: props.projectVersionReview.data().notes,
      editMode: false,
    }
  }

  settingsChanged = () => {

  };

  handleClick = (event, action) => {

  };

  render() {
    return (
      <ExpansionPanel
        expanded={this.props.expanded}
        onChange={this.props.onChange}
        panelActions={(
          <PaperActions
            relative
            editMode={this.state.editMode}
            onClick={(event, action) => this.handleClick(event, action)}
            settingsChanged={this.settingsChanged}
          />
        )}
        panelContent={<File/>}
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