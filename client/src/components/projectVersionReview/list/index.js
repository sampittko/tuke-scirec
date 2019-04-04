import React from 'react';
import propTypes from 'prop-types'
import ListItem from "./Item";
import {connect} from "react-redux";
import projectVersionReviewPropTypes from '../../../propTypes/projectVersionReviewPropTypes';
import NoData from "./NoData";

class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedPanel: -1,
    }
  }

  handleChange = (event, panel) => {
    this.setState({
      expandedPanel: this.state.expandedPanel === panel ? -1 : panel
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
                projectVersionReview={projectVersionReview}
                index={i}
                expanded={this.state.expandedPanel === i}
                onChange={(event) => this.handleChange(event, i)}
              />
            ))}
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