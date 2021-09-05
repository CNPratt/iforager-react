import React, { Component } from 'react';
import ObsCard from './ObsCardComponent';
import {getFile} from './GetFileFunctions'

let resultsObject;
let lat;
let lon;

let obsArray = [];
let cardArray = ["this", "that"];
let cardObj;

const updater = new CustomEvent('updateArray');

let currentIDs;
let mushroomIDs = "48431,47348,56830,48496,53714";
let fruitIDs = "50900,83434,58736,54500,47351,60773,50999,47902,54297";
let berryIDs = "50299,48353,47544,47130,64697";

//  if(document.getElementById("mushroomDIV")) {
//      currentIDs = mushroomIDs;
//  }

//  if(document.getElementById("fruitDIV")) {
     currentIDs = fruitIDs;
// }

// if(document.getElementById("berryDIV")) {
//     currentIDs = berryIDs;
// }

export class Observation {
    constructor(name, species, genLocation, obsLat, obsLon, distance, url, image, createDate, trueDistance) {
        this.name = name;
        this.species = species;
        this.genLocation = genLocation;
        this.obsLat = obsLat;
        this.obsLon = obsLon;
        this.distance = distance;
        this.url = url;
        this.image = image.replace("square", "original");
        this.createDate = createDate;
        this.trueDistance = trueDistance;
    }
}

export function idSwitcher(ids) {
    currentIDs = ids;
    console.log(currentIDs);
    Run();
}

function getLocation() {


    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(positionRelay, positionError);
    }

    function positionError() {

        console.log('Geolocation is not enabled. Please enable to use this feature')

    }
}

function positionRelay(position) {

    lat = position.coords.latitude;
    lon = position.coords.longitude;

    Run();
}

function Run() {

    obsArray = [];
    cardArray = [];

    console.log(cardArray);

    getFile(lat, lon, currentIDs).then((value) => {
        obsArray = value;
        
        // console.log(obsArray);
        
        cardArray = obsArray.map(obs => <ObsCard key={obs.url} observation={obs}/>);
        
        cardArray.sort((a, b) => (a.props.observation.trueDistance > b.props.observation.trueDistance) ? 1 : -1);

        console.log(cardArray);

         document.dispatchEvent(updater);

      });
}



function RenderCards(props){
    if(props.cardArray) {

            // console.log(props.cardArray);

           return props.cardArray;
    } else {
        return (<div></div>)
    }

}

export class CardDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: cardArray
        }

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        document.addEventListener('updateArray', this.update)
    }

    update() {
        
        this.setState({
            cards: cardArray
        })

        console.log('updated');
    }

    render() {
        
        document.getElementById('updater');

        if(this.state.cards){
            return (
            <div className="row-fluid">
                <div className="col">
                 <RenderCards cardArray={this.state.cards} />
                 {/* <button onClick={this.update}> Click me! </button> */}
                 </div>
            </div>
            )
        } else {
            return (<div>
                {/* <button onClick={this.update}> Click me! </button> */}
            </div>)
        }

    }
}

getLocation();

// function inputRelay() {

//     event.preventDefault();
//     input = document.getElementById("input").value;
//     queryInput = encodeURIComponent(input);

//     file = "https://cors.bridged.cc/https://nominatim.openstreetmap.org/search?format=json&q=" + queryInput;

//     console.log(file);

//     fetch(file)
//         .then(response => response.json())
//         .then(data => geocodedInput = data[0])
//         .then(response => console.log(geocodedInput.lat))
//         .then(response => lat = geocodedInput.lat)
//         .then(response => lon = geocodedInput.lon)
//         .then(geocodedInput => Run())
// }