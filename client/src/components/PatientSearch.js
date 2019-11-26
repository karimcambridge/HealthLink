import React, { Component } from 'react';
import Search from './helpers/Search';

class Patient extends Component {
    render() {
        return (
            <div>{this.props.patient.first_name} {this.props.patient.last_name} ({this.props.patient.national_id})</div>
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
                this.setState({ patients: parsedJSON });
                console.log('data fetched ' + JSON.stringify(this.state.patients));
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Search list={this.state.patients} filterList={(query, patient) => (query.length && (patient.national_id.toLowerCase().search(query) !== -1 || patient.first_name.toLowerCase().search(query) !== -1 || patient.last_name.toLowerCase().search(query) !== -1)) } onListUpdate={ patients => this.setState({ visiblePatients: patients }) } />
                <div>
                    { this.state.visiblePatients ? this.state.visiblePatients.map(patient => {
                        return <Patient patient={patient} key={patient.id} />;
                    }) : 'Empty' }
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
                        Enter a national ID, first name or last name to search
                        <PatientsList />
                    </div>
                </div>
            </div>
        )
    }
}

export default PatientSearch;