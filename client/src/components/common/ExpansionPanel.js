import './ExpansionPanel.scss';
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import propTypes from 'prop-types';

const ExpansionPanelComponent = props =>
  <ExpansionPanel
    expanded={props.expanded}
    onChange={props.onChange}
    className={`expansion-panel ${props.updating && props.expanded ? "updating" : ""}`}
  >
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon/>}
      IconButtonProps={{disableRipple: true}}
      className="summary"
    >
      <Typography>{props.title}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className="details">
      {props.panelContent}
    </ExpansionPanelDetails>
    <Divider/>
    <ExpansionPanelActions className="actions">
      {props.panelActions}
    </ExpansionPanelActions>
  </ExpansionPanel>;

ExpansionPanelComponent.propTypes = {
  title: propTypes.string.isRequired,
  panelContent: propTypes.any.isRequired,
  panelActions: propTypes.any.isRequired,
  expanded: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
  updating: propTypes.bool,
};

export default ExpansionPanelComponent;