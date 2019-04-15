import './Home.scss';

import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Fade, Typography} from '@material-ui/core';

import {Link} from 'react-router-dom';
import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {getDashboardRoute} from '../utils/dashboardUtils';
import {getDocumentTitleFromComponent} from '../utils/appConfigUtils';
import logo from '../static/media/logo.png';
import propTypes from 'prop-types';
import routes from '../config/app/routes';
import {timeouts} from '../config/mui';

class Home extends React.Component {
  componentDidMount() {
    document.title = getDocumentTitleFromComponent(this);
  }

  render() {
    return (
      <div>
        {this.props.dashboards ? (
          <Redirect to={getDashboardRoute(this.props.activeDashboardRoute)}/>
        ) : (
          <div>
            {!this.props.isDashboardLoading && (
              <Fade in timeout={timeouts.FADE_IN}>
                <Card className="home">
                  <CardActionArea disableRipple>
                    <CardMedia
                      className="media"
                      image={logo}
                      title="SCIREC logo"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Vitajte
                      </Typography>
                      <Typography component="p">
                        SCIREC je nástroj pre kontrolu verzií vedeckých publikácií a záverečných prác. Systém je veľmi
                        jednoduchý na používanie a pomôže Vám s organizovaním Vašich osobných projektov. Jeho používanie
                        si vyžaduje mať zriadený účet a byť prihlásený.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link
                      className="link"
                      to={routes.LOGIN}
                    >
                      <Button
                        size="small"
                        color="primary"
                      >
                        Prihlásenie
                      </Button>
                    </Link>
                    <Link
                      className="link"
                      to={routes.REGISTER}
                    >
                      <Button
                        size="small"
                        color="primary"
                      >
                        Registrácia
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Fade>
            )}
          </div>
        )}
      </div>
    )
  }
}

Home.propTypes = {
  dashboards: propTypes.array,
  activeDashboardRoute: propTypes.string,
  isDashboardLoading: propTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    activeDashboardRoute: state.dashboard.selector.activeRoute || "",
    dashboards: state.dashboard.data.list,
    isDashboardLoading: state.dashboard.isLoading
  }
};

export default connect(mapStateToProps)(Home);