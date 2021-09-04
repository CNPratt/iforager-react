import { Observation } from './ObservationComponent';

let obsArray = [];

function createElement(element, lat, lon) {

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

    let thisLat = parseFloat(coordSplit[0]);
    let thisLon = parseFloat(coordSplit[1]);

    //         console.log(`${thisLat}, ${thisLon}`);

    let preDistance = getDistance(thisLat, thisLon, lat, lon).toString();
    let distance = parseFloat(preDistance.slice(0, 4)) + 'mi';

    let thisObs = new Observation(element.taxon.name, element.taxon.preferred_common_name, element.place_guess, thisLat, thisLon, distance, element.uri, element.observation_photos[0].photo.url, element.created_at_details.date);

    obsArray.push(thisObs);
}

export const getFile = async (lat, lon, currentIDs) => {


    const response = await fetch(
        `
        https://cors.bridged.cc/https://api.inaturalist.org/v1/observations/?taxon_id=${currentIDs}&quality_grade=research&captive=false&lat=${lat}&lng=${lon}&radius=24&per_page=200&acc_below=100&geoprivacy=open&photos=true
  
        `
    );

    const resultsObject = await response.json();

    // console.log(resultsObject.results);

    resultsObject.results.forEach(element => {

        createElement(element, lat, lon);

    });

    obsArray.sort((a, b) => (a.distance > b.distance) ? 1 : -1)

    // const cardArray = obsArray.map(obs => <ObsCard observation={obs}/>);

    // console.log(obsArray);

    return obsArray;
}