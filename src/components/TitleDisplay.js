import { Stagger, Fade } from "react-animation-components";

export function TitleDisplay(props) {
  return (
    <div
      className="container d-flex justify-content-center mb-2"
      id="pageTitle"
    >
      <div className="row">
        <div className="col d-flex align-items-middle" id="titleCont">
          {/* <Fade in className="d-flex"> */}
          {!props.loading ? (
            <img
              alt=""
              height="50px"
              width="50px"
              src={`../imgs/${props.typeName}.svg`}
              className="mb-0"
            />
          ) : (
            <div className="fa mr-2">
              <i className="fa fa-compass fa-pulse mt-2" fill="green"></i>
            </div>
          )}
          <div className="">
            {props.loading ? " LOADING " : props.typeName.toUpperCase()}
          </div>
          {!props.loading ? (
            <img
              alt=""
              height="50px"
              width="50px"
              src={`../imgs/${props.typeName}.svg`}
              className="mb-0"
            />
          ) : (
            <div className="fa ml-2">
              <i className="fa fa-compass fa-pulse mt-2" fill="green"></i>
            </div>
          )}

          {/* </Fade> */}
        </div>
      </div>
    </div>
  );
}
