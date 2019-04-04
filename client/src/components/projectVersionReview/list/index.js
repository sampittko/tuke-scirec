import React from 'react';
import propTypes from 'prop-types'
import ListItem from "./item";
import {connect} from "react-redux";
import projectVersionReviewPropTypes from '../../../propTypes/projectVersionReviewPropTypes';
import NoData from "./NoData";
import Notification from "../../common/Notification";

class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedPanel: -1,
      notifySave: false,
      notifyDelete: false,
    }
  }

  handleChange = (event, panel) => {
    this.setState({
      expandedPanel: this.state.expandedPanel === panel ? -1 : panel
    });
  };

  handleClose = () => {
    this.setState({
      notifySave: false,
      notifyDelete: false,
    })
  };

  render() {
    return (
      <div>
        {this.props.projectVersionReviews.length > 0 ? (
          <div>
            {this.props.projectVersionReviews.map((projectVersionReview, i) => (
              <ListItem
                key={i}
                projectVersionReview={projectVersionReview}
                index={i}
                expanded={this.state.expandedPanel === i}
                onChange={(event) => this.handleChange(event, i)}
              />
            ))}
            {this.state.notifySave && (
              <Notification message="Zmeny boli úspešne uložené" onClose={this.handleClose}/>
            )}
            {this.state.notifyDelete && (
              <Notification message="Posudok bol odstránený" onClose={this.handleClose}/>
            )}
          </div>
        ) : (
          <NoData/>
        )}
      </div>
    )
  }
}

ListComponent.propTypes = {
  projectVersionReviews: propTypes.arrayOf(propTypes.object),
  isProjectVersionReviewLoading: projectVersionReviewPropTypes.isLoading.isRequired,
};

const mapStateToProps = state => {
  return {
    projectVersionReviews: state.projectVersionReview.data.list,
    isProjectVersionReviewLoading: state.projectVersionReview.isLoading,
  }
};

export default connect(mapStateToProps)(ListComponent);