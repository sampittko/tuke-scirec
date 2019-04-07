import React from 'react';
import Viewer from "./viewer";
import UploaderDialog from "./UploaderDialog";
import propTypes from 'prop-types';
import {connect} from "react-redux";
import {incrementFilesId, removeFilesAtIndex} from "../../store/actions/fileActions";

class File extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      filesIndex: props.filesIndex,
    }
  }

  componentDidMount() {
    this.props.incrementFilesId();
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
          filesIndex={this.state.filesIndex}
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

  componentWillUnmount() {
    this.props.removeFilesAtIndex(this.props.filesIndex);
  }
}

File.propTypes = {
  editable: propTypes.bool,
  ownerEntity: propTypes.object.isRequired,
  filesIndex: propTypes.number.isRequired,
  incrementFilesId: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    incrementFilesId: () => dispatch(incrementFilesId()),
    removeFilesAtIndex: filesIndex => dispatch(removeFilesAtIndex(filesIndex)),
  }
};

export default connect(null, mapDispatchToProps)(File);