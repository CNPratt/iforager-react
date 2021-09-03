import React, { Component } from 'react';
import { globalObsArray, obsCardArray } from './ObservationComponent'
import Header from './HeaderComponent';


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
                {obsCardArray}
            </div>
        );
    }
}

console.log();

export default Main;