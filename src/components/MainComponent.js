import React, { Component } from 'react';
import Header from './HeaderComponent';
import { CardDisplay } from './CardDisplayComponent'
import { Switch, Route, Redirect } from 'react-router-dom';
import { idObject } from './IDObject';
import ObsCard from './ObsCardComponent';
import { getFile } from './GetFileFunctions';
import {HomePage} from './HomePageComponent'

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: null,
            isOpen: false,
            latlon: [
              0, 0
            ]
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {

        // document.addEventListener('updateArray', this.update)

        this.getLocation();

    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
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

        return (

            <div className="main" height="100%">

                <Header isOpen={this.state.isOpen} toggle={this.toggle} />

                <Switch>

                    <Route exact path='/finder/(mushrooms|berries|fruit)' render={(props) => <CardDisplay position={this.state.latlon} type={props.match.params[0]} {...props} />} />

                    <Route exact path='/home' component={HomePage} />

                    <Redirect to='/home' />
                </Switch>
            </div>
        );
    }
}

export default Main;