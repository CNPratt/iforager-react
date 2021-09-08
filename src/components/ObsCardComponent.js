import React, { Component } from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle,
  } from 'reactstrap';
  import { Capitalizer } from './GetFileFunctions';

class ObsCard extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        
        // console.log(this.props);

        return (
            <Card key={this.props.observation.url} style={{display: 'flex', flexDirection: 'row'}}>
                <a href={this.props.observation.url} target="blank">
                    <img className="card-img-top" alt="" src={this.props.observation.image} />
                </a>
                <CardBody className="p-0">
                    <div className="cbCont1">
                        <CardTitle className=""><h5 className="m-0">{this.props.observation.species.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')}</h5></CardTitle>
                        <CardSubtitle><h6 className="">{this.props.observation.name}</h6></CardSubtitle>
                        <CardText>{this.props.observation.genLocation}</CardText>
                        {/* <div className="cardDist">{this.props.observation.distance}</div> */}
                    </div>
                    <div className="cbCont2">
                    <div className="cardDist">{this.props.observation.distance}</div>
                        <div className="cardDate">{this.props.observation.createDate}</div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default ObsCard;