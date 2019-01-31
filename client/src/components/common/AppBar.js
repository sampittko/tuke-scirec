import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppMenu from './AppMenu';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

const Navigation = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <AppMenu />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            SCIREC
          </Typography>
          <Link className={classes.link} to="/registracia" activeClassName="active">
            <Button color="inherit">Registrácia</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Navigation);