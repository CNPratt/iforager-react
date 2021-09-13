import React from 'react';
import { Form, FormGroup, Input, } from 'reactstrap';

export function LocationForm(props) {
    
    // console.log(props);

    return (
        <div className="footer" id="formRow">
            <div className="col justify-content-center d-flex" id="formCol">
                <Form id="form" className="w-75" onSubmit={props.relay}>
                    <FormGroup className="d-flex m-0 my-3">
                        <Input id="input" className="form-control-lg mx-2" name="input" type="text" placeholder="Enter location" />
                        <Input id="submit" type="submit" value="Submit" className="btn btn-lg btn-secondary m-auto" />
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
}