import { Observation } from './ObservationComponent';
import {getDistance} from './DistanceFunc';

let obsArray = [];

function createElement(element, lat, lon) {

    let coordSplit = element.location.split(",");

    let thisLat = parseFloat(coordSplit[0]);
    let thisLon = parseFloat(coordSplit[1]);

    //         console.log(`${thisLat}, ${thisLon}`);
    let trueDistance = getDistance(thisLat, thisLon, lat, lon);
    let preDistance = trueDistance.toString();
    let distance = parseFloat(preDistance.slice(0, 4)) + 'mi';

    let thisObs = new Observation(element.taxon.name, element.taxon.preferred_common_name, element.place_guess, thisLat, thisLon, distance, element.uri, element.observation_photos[0].photo.url, element.created_at_details.date, trueDistance);

    if(!obsArray.includes(thisObs)) {
        obsArray.push(thisObs);
    };
 
}

export const getFile = async (lat, lon, currentIDs) => {

    obsArray = [];

    const response = await fetch(
        `
        https://cors.bridged.cc/https://api.inaturalist.org/v1/observations/?taxon_id=${currentIDs}&quality_grade=research&captive=false&lat=${lat}&lng=${lon}&radius=24&per_page=200&acc_below=100&geoprivacy=open&photos=true
  
        `
    );

    const resultsObject = await response.json();

     console.log(resultsObject.results);

    resultsObject.results.forEach(element => {
        
        createElement(element, lat, lon);

    });

    // obsArray.sort((a, b) => (a.distance > b.distance) ? 1 : -1);

    // const cardArray = obsArray.map(obs => <ObsCard observation={obs}/>);

    //  console.log(obsArray);

    return obsArray;
}