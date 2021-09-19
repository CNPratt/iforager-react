import { Stagger, Fade } from "react-animation-components";

export function TitleDisplay(props) {
  return (
    <div
      className="container d-flex justify-content-center mb-2"
      id="pageTitle"
    >
      <div className="row">
        <div className="col d-flex align-items-middle" id="titleCont">
          <Fade in className="d-flex">
            <img
              alt=""
              height="50px"
              width="50px"
              src={`../imgs/${props.typeName}.svg`}
              className="mb-0"
            />
            <div className="">{props.typeName.toUpperCase()}</div>
            <img
              alt=""
              height="50px"
              width="50px"
              src={`../imgs/${props.typeName}.svg`}
              className="mb-0"
            />
          </Fade>
        </div>
      </div>
    </div>
  );
}
