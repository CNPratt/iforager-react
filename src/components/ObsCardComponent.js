import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

class ObsCard extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        // console.log(this.props);
        return (
            <Card key={this.props.observation.url} style={{display: 'flex', flexDirection: 'row'}}>
                <a href={this.props.observation.url} target="blank">
                    <img className="card-img-top" src={this.props.observation.image} />
                </a>
                <CardBody className="m-0 p-0">
                    <div className="cbCont1">
                        <CardTitle>{this.props.observation.name}</CardTitle>
                        <CardSubtitle>{this.props.observation.species}</CardSubtitle>
                        <CardText>{this.props.observation.genLocation}</CardText>
                        <div className="cardDist">{this.props.observation.distance}</div>
                    </div>
                    <div className="cbCont2">
                        <div className="cardDate">{this.props.observation.createDate}</div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default ObsCard;