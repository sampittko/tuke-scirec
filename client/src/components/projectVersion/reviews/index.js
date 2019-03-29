import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import './index.scss';
import File from "../file";
import ExpansionPanel from '../../common/ExpansionPanel';
import EditModeActionButtons from "../../common/EditModeActionButtons";
import Counter from "./Counter";

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedPanel: 1,
    }
  }

  handleChange = (event, panel) => {
    this.setState({
      expandedPanel: this.state.expandedPanel === panel ? 0 : panel
    });
  };

  render() {
    return (
      <div className="reviews">
        <Typography variant={this.props.latest ? "body1" : "h6"} className="page-title">Posudky</Typography>
        <Paper className="paper">
          <ExpansionPanel
            expanded={this.state.expandedPanel === 1}
            onChange={(event) => this.handleChange(event, 1)}
            panelActions={(
              <EditModeActionButtons
                editMode={false}
                onClick={() => ""}
                settingsChanged={false}
              />
            )}
            panelContent={<File/>}
            title="Posudok 1"
          />
          <ExpansionPanel
            expanded={this.state.expandedPanel === 2}
            onChange={(event) => this.handleChange(event, 2)}
            panelActions={(
              <EditModeActionButtons
                editMode={false}
                onClick={() => ""}
                settingsChanged={false}
              />
            )}
            panelContent={<File/>}
            title="Posudok 2"
          />
          <Counter reviewsCount={2}/>
        </Paper>
      </div>
    );
  }
}

Review.propTypes = {
  latest: propTypes.bool,
};

export default Review;