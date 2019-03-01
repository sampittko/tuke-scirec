import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'; 
import { getDocumentTitle } from '../config/app/titles';
import routes from '../config/app/routes';

class Welcome extends React.Component {
  componentDidMount() {
    document.title = getDocumentTitle(this);
  }

  render() {
    return !this.props.isAuth ? (
      <Redirect to={routes.auth.login} />
    ) : (
      <Redirect to={routes.dashboard} />
    )
  }
}

Welcome.propTypes = {
  isAuth: propTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.success
  }
}

export default connect(mapStateToProps)(Welcome);