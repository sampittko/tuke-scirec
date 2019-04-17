import './Home.scss';
import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {getDashboardRoute} from '../utils/dashboardUtils';
import {getDocumentTitleFromComponent} from '../utils/appConfigUtils';
import propTypes from 'prop-types';
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import {autoPlay} from 'react-swipeable-views-utils';
import path1 from '../static/media/home/views/1.png';
import path2 from '../static/media/home/views/2.png';
import path3 from '../static/media/home/views/3.png';
import path4 from '../static/media/home/views/4.png';
import path5 from '../static/media/home/views/5.png';
import logo from '../static/media/logo.png';
import Fade from "@material-ui/core/Fade";
import {timeouts} from "../config/mui";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const views = [
  {
    headline: 'Prehľadná evidencia',
    imagePath: path1,
  }, {
    headline: 'Kategorizácia',
    imagePath: path2,
  }, {
    headline: 'Centralizovaný prehľad',
    imagePath: path3,
  }, {
    headline: 'Zálohovanie súborov na Cloud',
    imagePath: path4,
  }, {
    headline: 'Bezpečnosť',
    imagePath: path5,
  },
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 0,
    }
  }

  componentDidMount() {
    document.title = getDocumentTitleFromComponent("Home");
  }

  handleChange = view => {
    this.setState({
      activeView: view,
    })
  };

  render() {
    return (
      <div>
        {this.props.dashboards ? (
          <Redirect to={getDashboardRoute(this.props.activeDashboardRoute)}/>
        ) : (
          <Fade in timeout={timeouts.FADE_IN}>
            <div className="home">
              <Card className="card">
                <CardActionArea disableRipple>
                  <CardMedia
                    className="card-media"
                    image={logo}
                    title="SCIREC logo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Vitajte
                    </Typography>
                    <Typography component="p">
                      SCIREC je nástroj pre kontrolu verzií vedeckých publikácií a záverečných prác. Systém pomáha s
                      kategorizáciou projektov, centralizáciou informácií o projektoch, so zálohovaním súborov na Cloud
                      pričom všetky informácie sú zabezpečené a prístupné len používateľovi, ktorý ich zadal. Pre jeho
                      používanie je nutné sa prihlásiť.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <AutoPlaySwipeableViews
                axis={'x'}
                index={this.state.activeView}
                onChangeIndex={this.handleChange}
                enableMouseEvents
              >
                {views.map((view, i) => (
                  <div key={i} className="media">
                    {Math.abs(this.state.activeView - i) <= 2 ? (
                      <img src={view.imagePath} alt={view.headline}/>
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              <div className="view-text">
                <Typography variant="h1" className="headline">
                  {views[this.state.activeView].headline}
                </Typography>
              </div>
            </div>
          </Fade>
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