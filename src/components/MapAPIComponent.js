import React, { Component } from 'react';
import { Map, Marker, Overlay } from "pigeon-maps"
import ObsCard from "./ObsCardComponent";
import { render } from 'react-dom';

export function SimpleMap (props) {


    let markers = [];
    let overlays = [];

    let positArray = props.observations.map(obs => [[obs.obsLat, obs.obsLon], obs.trueID])

    // console.log(props.observations);


    markers = positArray.map(element => <Marker width={25} anchor={element[0]} color="green" key={element[1]} onMouseOver={() => document.getElementById(`overlay${element[1]}`).style.display = "initial"} onMouseOut={() => document.getElementById(`overlay${element[1]}`).style.display = "none"} />)

    // onClick={() => document.getElementById(element[1]).scrollIntoView()}
    //add into markers above for scroll to card

    overlays = props.observations.map(element =>

        <Overlay anchor={[element.obsLat, element.obsLon]} offset={[element.species.length * 2, 10]} key={element.trueID} style={{ color: "black", backgroundColor: "white", fontSize: "x-small" }}>
            {/* <img src="../imgs/fruit.svg" width={25} height={25} alt='' style={{fill:"green"}} /> */}

            <span  id={`overlay${element.trueID}`}  style={{display: "none"}}>{element.species}</span>
        </Overlay>)


    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <Map height={500} width={500} center={props.latlon} defaultZoom={10}
                >
                    <Marker width={50} anchor={props.latlon} color="brown" />
                    {markers}
                    {overlays}
                    {/* name overlays for map */}
                </Map>

            </div>
        </div>

    )
}