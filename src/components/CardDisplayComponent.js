import React, { Component } from 'react';
import { getFile } from './GetFileFunctions';
import ObsCard from './ObsCardComponent'
import { TitleDisplay } from './TitleDisplay';
import { idObject } from './IDObject';


export class CardDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            observations: [],
            errorMsg: null
        }
    }

    getData() {
        getFile(this.props.latlon , this.props.type).then((value) => {
        this.setState({
            observations: value,
            errorMsg: null
        })

        
    }).catch((error) => {

        this.setState({
            errorMsg: 'Sorry! You have been temporarily blocked by iNaturalist due to request frequency. Please wait a minute or two and try again.'
        })

        console.log(error);
    })
}

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if(this.props.type !== prevProps.type || this.props.latlon !== prevProps.latlon) {

            // this.setState({
            //     observations: [],
            //     errorMsg: null
            // }) 
            //trying to reset display cards

            this.getData();
        }
    }

    render() {

//        console.log("carddisplay props",  this.props);
//        console.log("carddisplay state",  this.state);



        if(this.state.errorMsg){
            return(

                <div>
                    <TitleDisplay typeName={this.props.type}/>

                    <div className="d-flex justify-content-center">{this.state.errorMsg}.</div>
                </div>

            )         
        }


        if(this.state.observations){
            return (
            <div className="row-fluid">

                <TitleDisplay typeName={this.props.type}/>

                <div className="col">
                 {this.state.observations.sort((a, b) => (a.trueDistance > b.trueDistance) ? 1 : -1).map(obs => <ObsCard key={obs.url} observation={obs}/>)}
                 </div>
            </div>
            );
        } else {
            return (<div></div>);
        }

    }
}