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
        return (
            <Card>
                <a href={this.props.url} target="blank">
                    <img className="card-img-top" src={this.props.observation.image} />
                </a>
                <CardBody>
                    <div className="cbCont1">
                        <CardTitle>{this.props.observation.prefName}</CardTitle>
                        <CardSubtitle>{this.props.observation.species}</CardSubtitle>
                        <CardText>{this.props.observation.location}</CardText>
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