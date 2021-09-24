import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import * as L from "leaflet";
import { useRef, useEffect } from "react";
import React from "react";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export function MainMap(props) {
  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const blueIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
      iconSize: [21, 34],
      iconAnchor: [11, 34],
      popupAnchor: [0, -20],
    }),
    greenIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
      iconSize: [21, 34],
      iconAnchor: [11, 34],
      popupAnchor: [0, -20],
    }),
    brownIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|a3651d&chf=a,s,ee00FFFF",
      iconSize: [21, 34],
      iconAnchor: [11, 34],
      popupAnchor: [0, -20],
    });

  let positArray = props.observations.map((obs) => [
    [obs.obsLat, obs.obsLon],
    obs.trueID,
    obs.species,
  ]);

  // const markers = positArray.map((element) => (
  //   <Marker
  //     icon={element[1] === props.selectedMarker ? blueIcon : greenIcon}
  //     zIndexOffset={element[1] === props.selectedMarker ? "100" : "0"}
  //     key={element[1]}
  //     position={element[0]}
  //     eventHandlers={{
  //       click: (e) => {
  //         // console.log('marker clicked', e)
  //         props.handler(element[1]);
  //       },
  //     }}
  //   >
  //     <Popup>{element[2]}</Popup>
  //   </Marker>
  // ));

  function AddMarkers(props) {
    let map = useMap();

    let homeOptions = {
      icon: brownIcon,
      zIndexOffset: "99",
    };

    let markerOptions;

    useEffect(() => {
      map.eachLayer((layer) => {
        if (!layer._url) {
          layer.remove();
        }

        // console.log(layer._url);
      });

      positArray.forEach((element) => {
        if (element[1] === props.selectedMarker) {
          markerOptions = {
            icon: blueIcon,
            zIndexOffset: "100",
            key: element[1],
          };
        } else {
          markerOptions = {
            icon: greenIcon,
            zIndexOffset: "0",
            key: element[1],
          };
        }

        // console.log(markerOptions)

        let marker = L.marker(element[0], markerOptions);
        marker.on("click", () => props.handler(element[1]));
        marker.addTo(map);
        marker.bindPopup(element[2]);

        if (element[1] === props.selectedMarker) {
          marker.openPopup();
        }
      });

      let home = L.marker(props.position, homeOptions);
      home.addTo(map);
    });

    return <div></div>;
  }

  // console.log(markers[positArray.findIndex(element => element[1] === props.selectedMarker)])

  return (
    <div>
      <MapContainer
        id="mapid"
        tap="false"
        center={props.latlon}
        zoom={9}
        scrollWheelZoom={false}
      >
        {!props.selected ? (
          <ChangeView center={props.latlon} zoom={9} />
        ) : (
          <div />
        )}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <Marker position={props.latlon} icon={brownIcon} zIndexOffset="50">
          <Popup>Home</Popup>
        </Marker>

        {/* {markers} */}
        <AddMarkers
          selectedMarker={props.selectedMarker}
          handler={props.handler}
          position={props.latlon}
        />
      </MapContainer>

      <div className="row-fluid w-100 mt-2">
        <div className="col">
          <div className="selectedCol">{props.selected}</div>
        </div>
      </div>
    </div>
  );
}
