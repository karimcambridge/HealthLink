import React, { Component } from 'react';
import Search from './helpers/Search';
import Moment from 'moment';

class Patient extends Component {
    render() {
        return (
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><a href="#">{this.props.patient.first_name} {this.props.patient.last_name}</a></h5>
                    <h6 class="card-subtitle mb-2 text-muted">{this.props.patient.dob}</h6>
                    <p class="card-text">{this.props.patient.national_id}</p>
                </div>
            </div>
        );
    }
}

class PatientsList extends Component {
    constructor() {
        super();
        this.state = {
            patients: [],
            visiblePatients: []
        }
    }

    componentDidMount() {
        this.fetchData();
        this.setState({ visiblePatients: [] });
    }

    fetchData() {
        return fetch('/patients/getall')
            .then(response => response.json())
            .then(parsedJSON => {
                parsedJSON.forEach(patient => {
                    patient.dob = Moment(patient.dob).utc().format('YYYY-MM-DD');
                });
                this.setState({ patients: parsedJSON });
                console.log('data fetched ' + JSON.stringify(this.state.patients));
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-sm-12 mb-3">
                        <Search placeholder="Enter a patient's national ID, first name or last name to search" list={this.state.patients} filterList={(query, patient) => (query.length && (patient.national_id.toLowerCase().search(query) !== -1 || patient.first_name.toLowerCase().search(query) !== -1 || patient.last_name.toLowerCase().search(query) !== -1))} onListUpdate={patients => this.setState({ visiblePatients: patients })} />
                    </div>
                </div>
                <div class="row" id="myItems">
                    <div class="col-sm-12 mb-3">
                        {this.state.visiblePatients ? this.state.visiblePatients.map(patient => {
                            return <Patient patient={patient} key={patient.id} />;
                        }) : 'Empty'}
                    </div>
                </div>
            </div>
        );
    }
}

class PatientSearch extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
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
                        <div className="mt-3"></div>
                        <PatientsList />
                    </div>
                </div>
            </div>
        )
    }
}

export default PatientSearch;