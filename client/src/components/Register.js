
import React, { Component } from 'react';
import { isAuthenticated, register } from './functions/UserFunctions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            title: 'Dr',
            role: 'General Practitioner',
            roles: [
                'Allergist',
                'Anaesthesiologist',
                'Andrologist',
                'Cardiologist',
                'Cardiac Electrophysiologist',
                'Dermatologist',
                'Emergency Room (ER) Doctors',
                'Endocrinologist',
                'Epidemiologist',
                'Family Medicine Physician',
                'Gastroenterologist',
                'General Practitioner',
                'Geriatrician',
                'Hyperbaric Physician',
                'Hematologist',
                'Hepatologist',
                'Immunologist',
                'Infectious Disease Specialist',
                'Intensivist',
                'Internal Medicine Specialist',
                'Maxillofacial Surgeon / Oral Surgeon',
                'Medical Examiner',
                'Medical Geneticist',
                'Neonatologist',
                'Nephrologist',
                'Neurologist',
                'Neurosurgeon',
                'Nuclear Medicine Specialist',
                'Nurse Practitioner',
                'Obstetrician/Gynecologist (OB/GYN)',
                'Occupational Medicine Specialist',
                'Oncologist',
                'Ophthalmologist',
                'Orthopedic Surgeon / Orthopedist',
                'Otolaryngologist (also ENT Specialist)',
                'Parasitologist',
                'Pathologist',
                'Perinatologist',
                'Periodontist',
                'Pediatrician',
                'Physiatrist',
                'Plastic Surgeon',
                'Psychiatrist',
                'Pulmonologist',
                'Radiologist',
                'Rheumatologist',
                'Sleep Doctor / Sleep Disorders Specialist',
                'Spinal Cord Injury Specialist',
                'Sports Medicine Specialist',
                'Surgeon',
                'Thoracic Surgeon',
                'Urologist',
                'Vascular Surgeon',
                'Veterinarian',
                'Acupuncturist',
                'Audiologist',
                'Ayurvedic Practioner',
                'Chiropractor',
                'Diagnostician',
                'Homeopathic Doctor',
                'Microbiologist',
                'Naturopathic Doctor',
                'Palliative care specialist',
                'Pharmacist',
                'Physiotherapist',
                'Podiatrist / Chiropodist'
            ],
            errors: {},
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (isAuthenticated()) {
            this.props.history.push(`/profile`);
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            title: this.state.title,
            role: this.state.role
        };

        register(newUser).then(res => {
            this.props.history.push(`/login`)
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <div className="col-md-6 mt-4 mx-auto">
                        <form onSubmit={this.onSubmit}>
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
                                    placeholder="Enter your first name"
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
                                    placeholder="Enter your last name"
                                    value={this.state.last_name}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Role</label>
                                <select className="form-control" id="role" name="role" value={this.state.role} onChange={this.onChange} required>
                                    { this.state.roles.map(role => <option>{role}</option>) }
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Register
                            </button>
                        </form>
                        <div className="mt-1 float-right">
                            Already have an account?&nbsp;
                            <a href="/login">Click here to login</a>
                        </div>
                    </div>
                </Row>
            </Container>
        )
    }
}

export default Register;