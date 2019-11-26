
import React, { Component } from 'react';
import { create } from './functions/PatientFunctions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class PatientCreate extends Component {
    constructor() {
        super();
        this.state = {
            national_id: '',
            title: 'Mr',
            first_name: '',
            last_name: '',
            dob: '',
            phone_no: '',
            address: '',
            errors: {},
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const
            contact_information = {}
        ;
        if (this.state.phone_no.length) {
            contact_information.phone_no_1 = parseInt(this.state.phone_no);
        }
        const newPatient = {
            national_id: this.state.national_id === '' ? null : this.state.national_id,
            title: this.state.title,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            dob: this.state.dob,
            contact_information: Object.keys(contact_information).length ? JSON.stringify(contact_information) : null,
            address: this.state.address === '' ? null : this.state.address,
        }

        create(newPatient).then(res => {
            this.props.history.push(`/patientsearch`);
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <div className="col-md-6 mt-4 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">National ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="national_id"
                                    placeholder="Enter their national ID (leave blank if none)"
                                    value={this.state.national_id}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Title</label>
                                <select className="form-control" id="title" name="title" value={this.state.title} onChange={this.onChange} required>
                                    <option>Mr</option>
                                    <option>Mrs</option>
                                    <option>Miss / Ms</option>
                                    <option>Dr</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="Enter their first name"
                                    value={this.state.first_name}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Enter their last name"
                                    value={this.state.last_name}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dob"
                                    placeholder="Enter their date of birth"
                                    value={this.state.dob}
                                    onChange={this.onChange}
                                    min='1920-01-01'
                                    max='2020-12-12'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Phone #</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phone_no"
                                    placeholder="Enter their phone no."
                                    value={this.state.phone_no}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Enter their address"
                                    value={this.state.address}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Create Patient
                            </button>
                        </form>
                    </div>
                </Row>
            </Container>
        )
    }
}

export default PatientCreate;