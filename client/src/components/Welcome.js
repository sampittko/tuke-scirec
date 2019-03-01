import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'; 
import { getDocumentTitle } from '../config/app/titles';
import routes from '../config/app/routes';

class Welcome extends React.Component {
  componentDidMount() {
    document.title = getDocumentTitle(this._reactInternalFiber.elementType.name);
  }

  render() {
    return !this.props.isAuth ? (
      <Redirect to={routes.LOGIN} />
    ) : (
      <Redirect to={routes.DASHBOARD} />
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