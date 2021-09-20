import ObsCard from "./ObsCardComponent";

export function CardStack(props) {
  return props.observations
    .sort((a, b) => (a.trueDistance > b.trueDistance ? 1 : -1))
    .map((obs) => (
      <ObsCard
        click={props.handleMarkerClick}
        obsid={obs.trueID}
        key={obs.trueID}
        observation={obs}
        selectedId={props.selectedMarker}
      />
    ));
}
