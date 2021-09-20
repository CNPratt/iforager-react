import React, { Component } from "react";
import Header from "./HeaderComponent";
import { CardDisplay } from "./CardDisplayComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { HomePage } from "./HomePageComponent";
import { inputRelay } from "./GetFileFunctions";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const gitURL = "https://cnpratt.github.io/iforager-react";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: null,
      latlon: [0, 0],
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  handleSubmit = async (e) => {

    e.preventDefault();
    
    const receivedLocation = await inputRelay();

    // console.log(receivedLocation);

    this.setState({
      latlon: [
        parseFloat(receivedLocation.lat),
        parseFloat(receivedLocation.lon),
      ],
    });
  };

  getLocation = () => {
    const positionRelay = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.setState({
        latlon: [lat, lon],
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionRelay, positionError);
    }

    function positionError() {
      console.log(
        "Geolocation is not enabled. Please enable to use this feature"
      );
    }
  };

  render() {
    // console.log(this.state);

    console.log(this.props.location.pathname);

    return (
      <div className="main container-fluid p-0" height="100%">
        <Header isOpen={this.state.isOpen} toggle={this.toggle} />

        <TransitionGroup>
          <CSSTransition
            key={this.props.location.pathname}
            classNames="page"
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route exact path="/home" component={HomePage} />

              <Route
                exact
                path="/finder/(mushrooms|berries|fruit|alliums)"
                render={(props) => (
                  <CardDisplay
                    latlon={this.state.latlon}
                    type={props.match.params[0]}
                    {...props}
                    relay={this.handleSubmit}
                  />
                )}
              />

              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default withRouter(Main);
