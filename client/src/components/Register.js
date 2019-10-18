
import React, { Component } from 'react';
import { register } from './UserFunctions';

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
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        }

        register(newUser).then(res => {
            this.props.history.push(`/login`)
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 mt-3 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                            <div className="form-group">
                                <label htmlFor="name">Title</label>
                                <select class="form-control" id="title" name="title" value={this.state.title} onChange={this.onChange} required>
                                    <option selected>Mr</option>
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
                                    placeholder="Enter your lastname name"
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
                                <select class="form-control" id="role" name="role" value={this.state.role} onChange={this.onChange} required>
                                    <option>Allergist</option>
                                    <option>Anaesthesiologist</option>
                                    <option>Andrologist</option>
                                    <option>Cardiologist</option>
                                    <option>Cardiac Electrophysiologist</option>
                                    <option>Dermatologist</option>
                                    <option>Emergency Room (ER) Doctors</option>
                                    <option>Endocrinologist</option>
                                    <option>Epidemiologist</option>
                                    <option>Family Medicine Physician</option>
                                    <option>Gastroenterologist</option>
                                    <option>General Practitioner</option>
                                    <option>Geriatrician</option>
                                    <option>Hyperbaric Physician</option>
                                    <option>Hematologist</option>
                                    <option>Hepatologist</option>
                                    <option>Immunologist</option>
                                    <option>Infectious Disease Specialist</option>
                                    <option>Intensivist</option>
                                    <option>Internal Medicine Specialist</option>
                                    <option>Maxillofacial Surgeon / Oral Surgeon</option>
                                    <option>Medical Examiner</option>
                                    <option>Medical Geneticist</option>
                                    <option>Neonatologist</option>
                                    <option>Nephrologist</option>
                                    <option>Neurologist</option>
                                    <option>Neurosurgeon</option>
                                    <option>Nuclear Medicine Specialist</option>
                                    <option>Obstetrician/Gynecologist (OB/GYN)</option>
                                    <option>Occupational Medicine Specialist</option>
                                    <option>Oncologist</option>
                                    <option>Ophthalmologist</option>
                                    <option>Orthopedic Surgeon / Orthopedist</option>
                                    <option>Otolaryngologist (also ENT Specialist)</option>
                                    <option>Parasitologist</option>
                                    <option>Pathologist</option>
                                    <option>Perinatologist</option>
                                    <option>Periodontist</option>
                                    <option>Pediatrician</option>
                                    <option>Physiatrist</option>
                                    <option>Plastic Surgeon</option>
                                    <option>Psychiatrist</option>
                                    <option>Pulmonologist</option>
                                    <option>Radiologist</option>
                                    <option>Rheumatologist</option>
                                    <option>Sleep Doctor / Sleep Disorders Specialist</option>
                                    <option>Spinal Cord Injury Specialist</option>
                                    <option>Sports Medicine Specialist</option>
                                    <option>Surgeon</option>
                                    <option>Thoracic Surgeon</option>
                                    <option>Urologist</option>
                                    <option>Vascular Surgeon</option>
                                    <option>Veterinarian</option>
                                    <option>Acupuncturist</option>
                                    <option>Audiologist</option>
                                    <option>Ayurvedic Practioner</option>
                                    <option>Chiropractor</option>
                                    <option>Diagnostician</option>
                                    <option>Homeopathic Doctor</option>
                                    <option>Microbiologist</option>
                                    <option>Naturopathic Doctor</option>
                                    <option>Palliative care specialist</option>
                                    <option>Pharmacist</option>
                                    <option>Physiotherapist</option>
                                    <option>Podiatrist / Chiropodist</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Register!
                            </button>
                        </form>
                        <div class="mt-1 float-right">
                            Already have an account?&nbsp;
                            <a href="/login">Click here to login</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;