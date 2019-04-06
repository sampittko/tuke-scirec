import React from 'react';
import Viewer from "./Viewer";
import UploaderDialog from "./UploaderDialog";
import propTypes from 'prop-types';

class File extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }))
  };

  render() {
    return (
      <div>
        <Viewer
          editable={this.props.editable}
          onClick={this.handleClick}
        />
        <UploaderDialog
          open={this.state.open}
          editable={this.props.editable}
          onClick={this.handleClick}
          ownerEntity={this.props.ownerEntity}
        />
      </div>
    );
  }
}

File.propTypes = {
  editable: propTypes.bool,
  ownerEntity: propTypes.object.isRequired,
};

export default File;