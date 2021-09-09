import React, { Component } from 'react';
import Header from './HeaderComponent';
import { CardDisplay } from './CardDisplayComponent'
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from './HomePageComponent'
import { LocationForm } from './LocationForm';
import { inputRelay } from './GetFileFunctions'

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: null,
            latlon: [
                0, 0
            ]
        };

    }

    componentDidMount() {

        this.getLocation();

    }

    handleSubmit = async (e) => {

        e.preventDefault();

        const receivedLocation = await inputRelay();

        console.log(receivedLocation);

        this.setState({
            latlon: [parseFloat(receivedLocation.lat), parseFloat(receivedLocation.lon)]
        })
    }

    getLocation = () => {

        const positionRelay = (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            this.setState({
                latlon: [lat, lon]
            })
        }

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(positionRelay, positionError);
        }

        function positionError() {

            console.log('Geolocation is not enabled. Please enable to use this feature')

        }
    }


    render() {

        console.log(this.state);

        return (

            <div className="main container-fluid p-0" height="100%">

                <Header isOpen={this.state.isOpen} toggle={this.toggle} />

                <LocationForm relay={this.handleSubmit} />

                <Switch>

                    <Route exact path='/finder/(mushrooms|berries|fruit|alliums)' render={(props) => <CardDisplay latlon={this.state.latlon} type={props.match.params[0]} {...props} />} />

                    <Route exact path='/home' component={HomePage} />

                    <Redirect to='/home' />
                </Switch>
            </div>
        );
    }
}

export default Main;