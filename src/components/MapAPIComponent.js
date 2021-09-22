import React, { Component } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";

export function SimpleMap(props) {
  let markers = [];
  let overlays = [];
  let positArray = props.observations.map((obs) => [
    [obs.obsLat, obs.obsLon],
    obs.trueID,
  ]);

  // console.log('rendered');

  markers = positArray.map((element) => (
      <Marker
        width={25}
        anchor={element[0]}
        color={element[1] === props.selectedMarker ? "blue" : "green"}
        // style={element[1] === props.selectedMarker ? {zIndex: "2"} : {zIndex: "0"}}
        key={element[1]}
        // onMouseOver={() =>
        //   (document.getElementById(`overlay${element[1]}`).style.display =
        //     "initial")
        // }
        // onMouseOut={() =>
        //   (document.getElementById(`overlay${element[1]}`).style.display = "none")
        // }
        onClick={() => {
          props.handler(element[1]);
        }}
      />
  ));

  // onClick={() => document.getElementById(element[1]).scrollIntoView()}
  //add into markers above for scroll to card

  // overlays = props.observations.map((element) => (
  //   <Overlay
  //     anchor={[element.obsLat, element.obsLon]}
  //     offset={
  //       element.species
  //         ? [element.species.length * 2, 0]
  //         : [element.name.length * 2, 10]
  //     }
  //     key={element.trueID}
  //     style={{ color: "black", backgroundColor: "white", fontSize: "x-small" }}
  //   >
  //     {/* <img src="../imgs/fruit.svg" width={25} height={25} alt='' style={{fill:"green"}} /> */}

  //     <span id={`overlay${element.trueID}`} style={{ display: "none" }}>
  //       {element.species}
  //     </span>
  //   </Overlay>
  // ));

  // console.log(props.selected[0].trueID)

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        {/* <Fade in key={props.transKey}> */}
          <div id="mapCont">
            <Map height={300} width={300} center={props.latlon} defaultZoom={9}>
              <Marker style={{zIndex: "1"}} width={25} anchor={props.latlon} color="brown" />
              {markers}
              {overlays}
              {/* name overlays for map */}
            </Map>
          </div>
        {/* </Fade> */}

        <div className="row-fluid w-100 mt-2">
          <div className="col">
            <div className="selectedCol">{props.selected}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
