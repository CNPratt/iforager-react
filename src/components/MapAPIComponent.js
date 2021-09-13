import React, { Component } from 'react';
import { Map, Marker, Overlay } from "pigeon-maps"

export function SimpleMap (props) {


    let markers = [];
    let overlays = [];
    let positArray = props.observations.map(obs => [[obs.obsLat, obs.obsLon], obs.trueID])

    console.log(props.selected);

    markers = positArray.map(element => <Marker width={25} anchor={element[0]} color="green" key={element[1]} onMouseOver={() => document.getElementById(`overlay${element[1]}`).style.display = "initial"} onMouseOut={() => document.getElementById(`overlay${element[1]}`).style.display = "none"} onClick={() => props.handler(element[1])} />)

    // onClick={() => document.getElementById(element[1]).scrollIntoView()}
    //add into markers above for scroll to card

    overlays = props.observations.map(element =>

        <Overlay anchor={[element.obsLat, element.obsLon]} offset={[element.species.length * 2, 10]} key={element.trueID} style={{ color: "black", backgroundColor: "white", fontSize: "x-small" }}>
            {/* <img src="../imgs/fruit.svg" width={25} height={25} alt='' style={{fill:"green"}} /> */}

            <span  id={`overlay${element.trueID}`}  style={{display: "none"}}>{element.species}</span>
        </Overlay>)

        // console.log(props.selected[0].trueID)

    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div id="mapCont">
                <Map height={300} width={300} center={props.latlon} defaultZoom={10} 
                >
                    <Marker width={50} anchor={props.latlon} color="brown" />
                    {markers}
                    {overlays}
                    {/* name overlays for map */}
                </Map> 
                </div>



                <div className="row-fluid w-100">
                    <div className="col">
                        <div className="selectedCol" >
                                                    {props.selected}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}