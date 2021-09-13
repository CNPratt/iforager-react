
export function TitleDisplay(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <h1 className="pageTitle">
                        <img alt="" height="50px" width="50px" src={`../imgs/${props.typeName}.svg`} className="mb-3" />
                        {props.typeName.toUpperCase()}
                        <img alt="" height="50px" width="50px" src={`../imgs/${props.typeName}.svg`} className="mb-3" />
                    </h1>
                </div>
            </div>
        </div>

    )
}