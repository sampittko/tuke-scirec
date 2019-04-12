import React from 'react';
import {CircularProgress, IconButton, ListItem, ListItemSecondaryAction, Tooltip, Typography} from "@material-ui/core";
import propTypes from 'prop-types';
import './index.scss';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import {connect} from "react-redux";
import {downloadFile, getFiles} from "../../../store/actions/fileActions";
import Add from "./Add";
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {convertBtoMB} from "../../../utils/fileUtils";
import DeleteConfirmDialog from "../DeleteConfirmDialog";

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      toDelete: null,
    }
  }

  componentDidMount() {
    this.props.getFiles(this.props.ownerEntity, this.props.filesIndex);
  }

  handleClick = (event, file) => {
    this.setState(prevState => ({
      open: !prevState.open,
      toDelete: file ? file : null,
    }))
  };

  render() {
    return (
      <div className="file-viewer">
        <Typography className="small-title">Súbory</Typography>
        <List dense className={`list ${this.props.latest ? "latest" : ""}`}>
          {this.props.filesLists[this.props.filesIndex] && this.props.filesLists[this.props.filesIndex].length !== 0 ? (
            <div>
              {this.props.filesLists[this.props.filesIndex].map((file, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={file.futureFileName ? file.futureFileName : file.data().name}
                    secondary={file.futureFileName ? "Načítava sa.." : `${convertBtoMB(file.data().size)}MB`}
                    className="list-item-text"
                  />
                  {this.props.editable && !file.futureFileName ? (
                    <ListItemSecondaryAction className="action">
                      <Tooltip title="Vymazať súbor">
                        <IconButton onClick={(event) => this.handleClick(event, file)}>
                          <DeleteIcon fontSize="small"/>
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  ) : (
                    <div>
                      {file.futureFileName ? (
                        <ListItemSecondaryAction className="action">
                          <IconButton disabled>
                            <CircularProgress
                              size={20}
                              color="secondary"
                            />
                          </IconButton>
                        </ListItemSecondaryAction>
                      ) : (
                        <ListItemSecondaryAction className="action">
                          <Tooltip title="Stiahnuť súbor">
                            <IconButton onClick={() => this.props.downloadFile(file, this.props.filesIndex)}>
                              <CloudDownloadIcon fontSize="small"/>
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      )}
                    </div>
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
        {this.state.toDelete && (
          <DeleteConfirmDialog
            open={this.state.open}
            fileToDelete={this.state.toDelete}
            filesIndex={this.props.filesIndex}
            onClick={this.handleClick}
          />
        )}
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
    downloadFile: (file, filesIndex) => dispatch(downloadFile(file, filesIndex)),
    getFiles: (ownerEntity, filesIndex) => dispatch(getFiles(ownerEntity, filesIndex)),
  }
};

const mapStateToProps = state => {
  return {
    filesLists: state.file.data.lists,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);