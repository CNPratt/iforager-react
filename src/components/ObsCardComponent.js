import React, { Component } from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle,
  } from 'reactstrap';

class ObsCard extends Component {
    constructor(props) {
        super(props);
    };
    

    render() {
        
        // console.log(this.props);
        return (
            <Card obsid={this.props.obsid} key={this.props.observation.trueID} style={{display: 'flex', flexDirection: 'row'}}>
                <a href={this.props.observation.url} target="blank">
                    <img className="card-img-top" alt="" src={this.props.observation.image} />
                </a>
                <CardBody className="p-0">
                    <div className="cbCont1">
                        <CardTitle className=""><h5 className="m-0">{this.props.observation.species ? this.props.observation.species.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ') : this.props.observation.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')}</h5></CardTitle>
                        <CardSubtitle><h6 className="m-0">{this.props.observation.name}</h6></CardSubtitle>
                        
                        <CardText>
                        <a style={{fontSize: "xx-small", display: "block", color: "rgb(106, 146, 106)"}} target="blank" href={`https://www.google.com/maps/search/?api=1&query=${this.props.observation.obsLat}%2C${this.props.observation.obsLon}`} >Drop Pin</a>
                            {this.props.observation.genLocation}</CardText>
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