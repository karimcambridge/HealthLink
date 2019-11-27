
import React, { Component } from 'react';
import { create } from './functions/PrescriptionFunctions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class PrescriptionCreate extends Component {
    constructor() {
        super();
        this.state = {
            patient_id: '',
            first_name: '',
            last_name: '',
            address: '',
            drug_names: '',
            note: '',
            errors: {},
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onGoBack = this.onGoBack.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const
            data = {}
        ;
        if (this.state.first_name.length) {
            data.first_name = this.state.first_name;
        }
        if (this.state.last_name.length) {
            data.last_name = this.state.last_name;
        }
        if (this.state.address.length) {
            data.address = this.state.address;
        }
        if (this.state.drug_names.length) {
            data.drug_names = this.state.drug_names;
        }
        if (this.state.note.length) {
            data.note = this.state.note;
        }
        const newPatient = {
            patient_id: this.state.patient_id === '' ? null : this.state.patient_id,
            data: Object.keys(data).length ? JSON.stringify(data) : null,
        }

        create(newPatient).then(res => {
            this.props.history.push(`/prescriptions/search`);
        });
    }

    onGoBack(e) {
        e.preventDefault();
 
        this.props.history.goBack();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="auto" className="mt-4">
                        <Button variant="info" size="lg" onClick={this.onGoBack}>
                            Go Back
                        </Button>
                    </Col>
                    <Col md="7" className="mt-4 mx-auto mb-4">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <img width="200" height="200" src="https://cdn0.iconfinder.com/data/icons/medical-health-care-blue-series-set-3/64/b-45-512.png" className="rounded mx-auto d-block" />
                                <label htmlFor="name">Search for a patient</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="patient_id"
                                    placeholder="Enter a patient's details (leave blank if none)"
                                    value={this.state.patient_id}
                                    onChange={this.onChange}
                                />
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
                            <div className="form-group">
                                <label htmlFor="name">Drug names (Products) and their amounts</label>
                                <textarea
                                    rows="3"
                                    className="form-control"
                                    name="drug_names"
                                    placeholder="Enter the name of the drugs and their amounts"
                                    value={this.state.drug_names}
                                    onChange={this.onChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Note</label>
                                <textarea
                                    rows="3"
                                    className="form-control"
                                    name="note"
                                    placeholder="Enter any extra notes, if any"
                                    value={this.state.note}
                                    onChange={this.onChange}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Create Prescription
                            </button>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PrescriptionCreate;