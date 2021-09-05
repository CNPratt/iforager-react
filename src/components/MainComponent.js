import React, { Component } from 'react';
import Header from './HeaderComponent';
import {CardDisplay} from './ObservationComponent'
import { Switch, Route, Redirect } from 'react-router-dom';


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
            <div className="main" height="100%">

                <Header isOpen={this.state.isOpen} toggle={this.toggle} />

                <Switch>
                    {/* <CardDisplay /> */}
                    <Route exact path='/fruit' component={CardDisplay} />
                    <Route exact path='/mushrooms' component={CardDisplay} />
                    <Route exact path='/berries' component={CardDisplay} />
                    <Redirect to='/fruit' />
                </Switch>
            </div>
        );
    }
}

// console.log(cardObj);

export default Main;