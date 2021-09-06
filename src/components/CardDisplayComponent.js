import React, { Component } from 'react';
import { idObject } from './IDObject';

export class CardDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        if(this.props.cards){
            return (
            <div className="row-fluid">
                <div className="col">
                 {this.props.cards}
                 </div>
            </div>
            );
        } else {
            return (<div></div>);
        }

    }
}