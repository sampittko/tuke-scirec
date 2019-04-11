import React from 'react';
import {IconButton, ListItem, ListItemSecondaryAction, Tooltip, Typography} from "@material-ui/core";
import propTypes from 'prop-types';
import './index.scss';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import {connect} from "react-redux";
import {downloadFile, getFiles} from "../../../store/actions/fileActions";
import Add from "./Add";
import DeleteIcon from '@material-ui/icons/Delete';
import {convertBtoMB} from "../../../utils/fileUtils";


class Viewer extends React.Component {
  componentDidMount() {
    this.props.getFiles(this.props.ownerEntity, this.props.filesIndex);
  }

  render() {
    return (
      <div className="file-viewer">
        <Typography className="small-title">Súbory</Typography>
        <List dense className={`list ${this.props.latest ? "latest" : ""}`}>
          {this.props.filesLists[this.props.filesIndex] && this.props.filesLists[this.props.filesIndex].length !== 0 ? (
            <div>
              {this.props.filesLists[this.props.filesIndex].map((file, i) => (
                <ListItem key={i} button onClick={() => this.props.downloadFile(file)}>
                  <ListItemText
                    primary={file.data().name}
                    secondary={`${convertBtoMB(file.data().size)}MB`}
                    className="list-item-text"
                  />
                  {this.props.editable && (
                    <ListItemSecondaryAction>
                      <Tooltip title="Vymazať súbor">
                        <IconButton>
                          <DeleteIcon fontSize="small"/>
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))}
            </div>
          ) : (
            <ListItem>
              <ListItemText primary="Žiadne súbory" className="list-item-text no-data"/>
            </ListItem>
          )}
          {this.props.editable && (
            <ListItem>
              <ListItemText
                primary={<Add onClick={this.props.onClick}/>}
                className="list-item-text"
              />
            </ListItem>
          )}
        </List>
      </div>
    );
  }
}

Viewer.propTypes = {
  editable: propTypes.bool,
  onClick: propTypes.func.isRequired,
  ownerEntity: propTypes.object.isRequired,
  filesIndex: propTypes.number.isRequired,
  getFiles: propTypes.func.isRequired,
  downloadFile: propTypes.func.isRequired,
  filesLists: propTypes.arrayOf(propTypes.arrayOf(propTypes.object)),
};

const mapDispatchToProps = dispatch => {
  return {
    downloadFile: file => dispatch(downloadFile(file)),
    getFiles: (ownerEntity, filesIndex) => dispatch(getFiles(ownerEntity, filesIndex)),
  }
};

const mapStateToProps = state => {
  return {
    filesLists: state.file.data.lists,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);