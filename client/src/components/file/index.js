import React from 'react';
import Viewer from "./viewer";
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
          latest={this.props.latest}
          editable={this.props.editable}
          onClick={this.handleClick}
          filesIndex={this.props.filesIndex}
          ownerEntity={this.props.ownerEntity}
        />
        <UploaderDialog
          open={this.state.open}
          editable={this.props.editable}
          onClick={this.handleClick}
          ownerEntity={this.props.ownerEntity}
          filesIndex={this.props.filesIndex}
        />
      </div>
    );
  }
}

File.propTypes = {
  latest: propTypes.bool,
  editable: propTypes.bool,
  ownerEntity: propTypes.object.isRequired,
  filesIndex: propTypes.number.isRequired,
};

export default File;