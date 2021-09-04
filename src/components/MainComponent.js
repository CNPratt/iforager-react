import React, { Component } from 'react';
import Header from './HeaderComponent';
import ObsCard from './ObsCardComponent';
import {getFile} from './GetFileFunctions'
import {CardDisplay} from './ObservationComponent'


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: null,
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }


    render() {

        // obsCardArray = globalObsArray.map(obs => <ObsCard observation={obs}/>);

        return (
            <div className="main">
                <Header isOpen={this.state.isOpen} toggle={this.toggle} />
                <CardDisplay />
            </div>
        );
    }
}

// console.log(cardObj);

export default Main;