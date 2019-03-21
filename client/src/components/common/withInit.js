import PropTypes from 'prop-types';
import React from 'react';

const withInit = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
        />
      );
    }

    componentDidUpdate() {
      if (this.props.isAuth && !this.props.dashboards && !this.props.isDashboardLoading) {
        this.props.getDashboards();
      }
    }
  }

  HOC.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    getDashboards: PropTypes.func.isRequired,
  }

  return HOC;
};

export default withInit;