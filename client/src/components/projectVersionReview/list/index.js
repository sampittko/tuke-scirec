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
      notify: false,
    }
  }

  handleChange = (event, panel) => {
    this.setState({
      expandedPanel: this.state.expandedPanel === panel ? -1 : panel
    });
  };

  handleClose = () => {
    this.setState({
      notify: false,
    })
  };

  handleSave = () => {
    this.setState({
      notify: true,
    });
  };

  render() {
    return (
      <div>
        {this.props.projectVersionReviews.length > 0 ? (
          <div>
            {this.props.projectVersionReviews.map((projectVersionReview, i) => (
              <ListItem
                key={i}
                onSave={this.handleSave}
                projectVersionReview={projectVersionReview}
                index={i}
                filesIndex={i + 1}
                expanded={this.state.expandedPanel === i}
                onChange={(event) => this.handleChange(event, i)}
              />
            ))}
          </div>
        ) : (
          <NoData/>
        )}
        {this.state.notify && (
          <Notification message="Zmeny boli úspešne uložené" onClose={this.handleClose}/>
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