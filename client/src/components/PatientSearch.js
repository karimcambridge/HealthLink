import React, { Component } from 'react';
import { isAuthenticated } from './functions/UserFunctions';

class PatientSearch extends Component {
    constructor() {
        super();
        this.state = {
            errors: { },
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
    }

    render() {
        
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div class="mt-3"></div>
                       test
                    </div>
                </div>
            </div>
        )
    }
}

export default PatientSearch;