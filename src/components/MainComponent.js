import React, { Component } from 'react';
import Header from './HeaderComponent';
import { CardDisplay } from './CardDisplayComponent'
import { Switch, Route, Redirect } from 'react-router-dom';
import { idObject } from './IDObject';
import ObsCard from './ObsCardComponent';
import { getFile } from './GetFileFunctions'

let isRunning = false;
let lat;
let lon;

let obsArray = [];
let cardArray = ["this", "that"];

const updater = new CustomEvent('updateArray');

let currentIDs;

currentIDs = idObject.mushroomIDs;

function run(ids) {
    isRunning = true;

    obsArray = [];
    cardArray = [];


    document.dispatchEvent(updater);

    // console.log(this.state.currentIDs);
    // console.log(cardArray);

    getFile(lat, lon, ids).then((value) => {
        obsArray = value;
        
        // console.log(obsArray);
        
        cardArray = obsArray.map(obs => <ObsCard key={obs.url} observation={obs}/>);
        
        cardArray.sort((a, b) => (a.props.observation.trueDistance > b.props.observation.trueDistance) ? 1 : -1);

        // console.log(cardArray);

        document.dispatchEvent(updater);

        isRunning = false;
        
    }).catch(function() {

        isRunning = false;

        cardArray = <div className="d-flex justify-content-center">Sorry! You have been temporarily blocked by iNaturalist due to request frequency. Please wait a minute or two and try again.</div>

        document.dispatchEvent(updater);

        console.log("CORS error");
    });;
}


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: null,
            isOpen: false,
            IDGroup: idObject.fruitIDs,
            cards: cardArray
        };

        this.toggle = this.toggle.bind(this);
        this.idSwitcher = this.idSwitcher.bind(this);
        this.positionRelay = this.positionRelay.bind(this);
        this.update = this.update.bind(this);
        // this.run = this.run.bind(this);
    }

    componentDidMount() {
        
        document.addEventListener('updateArray', this.update)

        this.getLocation();

    }

    // componentDidUpdate(prevState, prevProps) {
    //     if(this.state.IDGroup != prevState.IDGroup && !isRunning) {
    //         console.log(this.state.IDGroup);
    //         run(this.state.IDGroup);
    //     }
    // }

    componentWillUnmount() {
        document.removeEventListener('updateArray', this.update)
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    idSwitcher(ids) {
        
        // console.log(isRunning);
        // console.log('before' + this.state.IDGroup);

         if(!isRunning && ids != this.state.IDGroup) {

        this.setState({
            IDGroup: ids
        });

            run(ids);
         }
    }

     update() {
        
         this.setState({
             cards: cardArray
         })

        //  console.log('updated');
     }

    getLocation() {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(this.positionRelay, positionError);
        }

        function positionError() {

            console.log('Geolocation is not enabled. Please enable to use this feature')

        }
    }

    positionRelay(position) {

        lat = position.coords.latitude;
        lon = position.coords.longitude;

        run(this.state.IDGroup);
    }

    render() {

        

        return (
            <div className="main" height="100%">

                <Header isOpen={this.state.isOpen} toggle={this.toggle} idswitch={this.idSwitcher} />

                <Switch>
                    {/* <CardDisplay /> */}
                    <Route exact path='/(fruit|mushrooms|berries)' render={() => <CardDisplay cards={this.state.cards} />} />
                    <Redirect to='/fruit' />
                </Switch>
            </div>
        );
    }
}

// console.log(cardObj);

export default Main;