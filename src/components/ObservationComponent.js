import React, { Component } from 'react';
import ObsCard from './ObsCardComponent';

let resultsObject;
let lat;
let lon;

let obsArray = [];

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

class Observation {
    constructor(name, species, genLocation, obsLat, obsLon, distance, url, image, createDate) {
        this.name = name;
        this.species = species;
        this.genLocation = genLocation;
        this.obsLat = obsLat;
        this.obsLon = obsLon;
        this.distance = distance;
        this.url = url;
        this.image = image.replace("square", "original");
        this.createDate = createDate;
    }

    // createItem() {
    //     let root = document.querySelector("#root");
    //     let milesDistance = this.distance * 0.621371;
    //     let mdString = milesDistance.toString();
    //     let mdInt = parseFloat(mdString.slice(0, 4));

    //     //console.log(mdInt);

    //     let link = document.createElement("a");
    //     link.setAttribute("href", this.url);
    //     link.setAttribute("target", "blank");

    //     let card = document.createElement("div");
    //     card.className = "card";

    //     let cardImg = document.createElement("img");
    //     cardImg.className = "card-img-top";
    //     //     console.log(this.image);
    //     cardImg.src = this.image;

    //     let cardBody = document.createElement("div");
    //     cardBody.className = "card-body";

    //     let cardTitle = document.createElement("h5");
    //     cardTitle.className = "card-title";
    //     cardTitle.innerText = this.species;

    //     let cardSubTitle = document.createElement("h6");
    //     cardSubTitle.className = "card-subtitle";
    //     cardSubTitle.innerText = this.name;


    //     let cardText = document.createElement("p");
    //     cardText.className = "card-text";
    //     cardText.innerText = `${this.genLocation}`;

    //     let cardDist = document.createElement("div");
    //     cardDist.className = "cardDist";
    //     cardDist.innerText = `${mdInt} miles`;

    //     let cardDate = document.createElement("div");
    //     cardDate.className = "cardDate";
    //     cardDate.innerText = `${this.createDate}`;

    //     let cbCont1 = document.createElement("div");
    //     cbCont1.className = "cbCont1";

    //     let cbCont2 = document.createElement("div");
    //     cbCont2.className = "cbCont2";

    //     root.appendChild(card);
    //     link.appendChild(cardImg);
    //     card.appendChild(link);
    //     card.appendChild(cardBody);
    //     cardBody.appendChild(cbCont1);
    //     cardBody.appendChild(cbCont2);
    //     cbCont1.appendChild(cardTitle);
    //     cbCont1.appendChild(cardSubTitle);
    //     cbCont1.appendChild(cardText);
    //     cbCont1.appendChild(cardDist);
    //     cbCont2.appendChild(cardDate);

    //     //    console.log("ran");
    // }
}

function getLocation() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(positionRelay, positionError);
    } else {
        // x.innerHTML = "Geolocation is not supported by this browser.";

        console.log("ran");
    }

    function positionError() {

        console.log('Geolocation is not enabled. Please enable to use this feature')

    }
}

function positionRelay(position) {

    //  console.log(position.coords.latitude);

    lat = position.coords.latitude;
    lon = position.coords.longitude;

    //  console.log("Latitude: " + lat +
    //  " Longitude: " + lon);

    Run();
}

getLocation();

function Run() {


    // root.innerHTML = "";

    obsArray = [];

    const getFile = async () => {
        const response = await fetch(
            `
            https://cors.bridged.cc/https://api.inaturalist.org/v1/observations/?taxon_id=${currentIDs}&quality_grade=research&captive=false&lat=${lat}&lng=${lon}&radius=24&per_page=200&acc_below=100&geoprivacy=open&photos=true
      
            `
        );
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson

        resultsObject = myJson;

        // console.log(resultsObject.results);

        resultsObject.results.forEach(element => {

            function getDistance(lat1, lon1, lat2, lon2) {

                function deg2rad(degrees) {
                    var pi = Math.PI;
                    return degrees * (pi / 180);
                }

                var R = 6371; // Radius of the earth in km
                var dLat = deg2rad(lat2 - lat1);  // deg2rad below
                var dLon = deg2rad(lon2 - lon1);
                var a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    ;
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c; // Distance in km
                d = d * 0.621371; //km to miles
                return d;
            }

            let coordSplit = element.location.split(",");

            // console.log(coordSplit[0]);

            let thisLat = parseFloat(coordSplit[0]);
            let thisLon = parseFloat(coordSplit[1]);

            //         console.log(`${thisLat}, ${thisLon}`);

            let distance = getDistance(thisLat, thisLon, lat, lon);

            let thisObs = new Observation(element.taxon.name, element.taxon.preferred_common_name, element.place_guess, thisLat, thisLon, distance, element.uri, element.observation_photos[0].photo.url, element.created_at_details.date);

            obsArray.push(thisObs);
        });

        obsArray.sort((a, b) => (a.distance > b.distance) ? 1 : -1)

        console.log(obsArray);

        obsArray.forEach(element => {

            // element.createItem();

        });
    }
}

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

export const globalObsArray = obsArray;
export const obsCardArray = globalObsArray.map(obs => <ObsCard observation={obs}/>);