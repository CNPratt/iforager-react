import React, { Component } from "react";
import { getFile } from "./GetFileFunctions";
import ObsCard from "./ObsCardComponent";
import { TitleDisplay } from "./TitleDisplay";
import { SimpleMap } from "./MapAPIComponent";
import { LocationForm } from "./LocationForm";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
import { CardStack } from "./CardStackComponent";
import { MainMap } from "./LeafletMapComponent";

export class CardDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      observations: [],
      selected: null,
      selectedMarker: null,
      errorMsg: null,
      loading: false,
    };
  }

  handleMarkerClick = (id) => {
    // console.log(id)

    this.setState({
      selected: this.state.observations
        .filter((obs) => obs.trueID === id)
        .map((obs) => (
          <ObsCard
            id="selectedCard"
            style={{ borderColor: "#CFBF00" }}
            obsid={`s${obs.trueID}`}
            key={obs.trueID}
            observation={obs}
          />
        )),
      selectedMarker: id,
    });
  };

  getData() {
    this.setState({
      observations: [],
      selected: null,
      selectedMarker: null,
      loading: true,
    });

    getFile(this.props.latlon, this.props.type)
      .then((value) => {
        this.setState({
          observations: value,
          errorMsg: null,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          errorMsg: (
            <div className="container">
              <div className="row" id="errorDisplay">
                <div className="col d-flex justify-content-center mx-5 mt-5 mb-2">
                  <div>
                    Sorry! You have encountered an error. You may have been temporarily blocked by iNaturalist due
                    to request frequency. Please wait a minute or two and try
                    again.
                  </div>
                </div>
              </div>
            </div>
          ),
          loading: false,
        });

        console.log(error);
      });
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.type !== prevProps.type ||
      this.props.latlon !== prevProps.latlon
    ) {
      this.getData();
    }

    // console.log(this.state.observations)
  }

  render() {
    //        console.log("carddisplay props",  this.props);
    //        console.log("carddisplay state",  this.state);

    console.log(this.state.loading);

    if (this.state.errorMsg) {
      return (
        <div>
          <TitleDisplay
            typeName={this.props.type}
            error={this.state.errorMsg}
          />

          <div className="d-flex justify-content-center">
            {this.state.errorMsg}.
          </div>
        </div>
      );
    }

    if (this.state.observations) {
      return (
        <div className="row-fluid" id="cardDisplayMain">
          <TitleDisplay
            typeName={this.props.type}
            loading={this.state.loading}
          />

          {/* <SimpleMap
            latlon={this.props.latlon}
            observations={this.state.observations}
            selected={this.state.selected}
            handler={this.handleMarkerClick}
            selectedMarker={this.state.selectedMarker}
            transKey={this.props.location.pathname}
          /> */}

          <MainMap
            latlon={this.props.latlon}
            observations={this.state.observations}
            selected={this.state.selected}
            handler={this.handleMarkerClick}
            selectedMarker={this.state.selectedMarker}
            transKey={this.props.location.pathname}
          />

          <LocationForm relay={this.props.relay} />
          <div className="col" id="cardCol">
            <Stagger in>
              {/* {this.state.observations
                  .sort((a, b) => (a.trueDistance > b.trueDistance ? 1 : -1))
                  .map((obs) => (
                    <ObsCard
                      click={this.handleMarkerClick}
                      obsid={obs.trueID}
                      key={obs.trueID}
                      observation={obs}
                      selectedId={this.state.selectedMarker}
                    />
                  ))} */}
              <CardStack
                observations={this.state.observations}
                handleMarkerClick={this.handleMarkerClick}
                selectedMarker={this.state.selectedMarker}
              />
            </Stagger>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
