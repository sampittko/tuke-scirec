import React from 'react';
import propTypes from 'prop-types';
import routes from '../../../routes';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import './Sidebar.scss';

class UserLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toHome: false
    }
  }
  
  handleClick = e => {
    e.preventDefault();
    if (this.props.location.pathname !== routes.home) {
      this.setState({
        toHome: true
      });
    }
  }
  
  render() {
    return (
      <div>
        {!this.state.toHome ? (
          <Link
            onClick={this.handleClick}
            className={this.props.location.pathname === routes.home ? "link disabled" : "link"}
            to=""
          >
            <ListItem
              selected={this.props.location.pathname === routes.home}
              button
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Domov</ListItemText>
            </ListItem>
          </Link>
        ) : (
          <Redirect to={routes.home} />
        )}
      </div>
    );
  }
}

UserLinks.propTypes = {
  location: propTypes.object.isRequired
}

export default UserLinks;