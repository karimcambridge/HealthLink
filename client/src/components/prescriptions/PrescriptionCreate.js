
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { create } from './functions/PrescriptionFunctions';
import { getAllPatients } from '../patients/functions/PatientFunctions';

class PrescriptionCreate extends Component {
	_isMounted = false;

	constructor() {
		super();
		this.state = {
			patientOptions: [{ key: null, value: 'None', label: 'None' }],
			selectedPatientOption: null,
			patientDataDisabled: false,
			patient_id: null,
			first_name: '',
			last_name: '',
			address: '',
			drug_names: '',
			note: '',
			errors: {},
		};
		this.state.selectedPatientOption = this.state.patientOptions[0];

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onGoBack = this.onGoBack.bind(this);
		this.handlePatientChange = this.handlePatientChange.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		getAllPatients()
			.then(parsedJSON => {
				if (this._isMounted) {
					parsedJSON.forEach(patient => {
						this.state.patientOptions.push({
							key: patient.id,
							value: `${JSON.stringify(patient)} ${patient.first_name} ${patient.last_name}`,
							label: `${patient.first_name} ${patient.last_name}`,
							first_name: patient.first_name,
							last_name: patient.last_name,
						});
					});
					this.setState({ patientOptions: this.state.patientOptions });
					//console.log('[PATIENTS LOADED]: ' + JSON.stringify(this.state.patientOptions));
				}
			})
			.catch(error => console.log(error))
		 ;
	}

	componentWillUnmount() {
		this._isMounted = false;
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
		const newPrescription = {
			data: Object.keys(data).length ? JSON.stringify(data) : null,
			patient_id: this.state.patient_id,
		};

		create(newPrescription).then(res => {
			this.props.history.push(`/prescriptions/search`);
		});
	}

	onGoBack(e) {
		e.preventDefault();
 
		this.props.history.goBack();
	}

	handlePatientChange = selectedOption => {
		if (this._isMounted) {
			console.log(`Option selected:`, selectedOption.key);
			if(selectedOption.key === null) {
				this.setState({ patientDataDisabled: false, first_name: '', last_name: '' });
			} else {
				this.setState({ patientDataDisabled: true, first_name: selectedOption.first_name, last_name: selectedOption.last_name } );
			}
			this.setState({ patient_id: selectedOption.key, selectedPatientOption: selectedOption });
		} // set first_name, last_name and disable form
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
								<img width="200" height="200" src="https://cdn0.iconfinder.com/data/icons/medical-health-care-blue-series-set-3/64/b-45-512.png" className="rounded mx-auto d-block" alt="rx-logo" />
								<label htmlFor="name">Search for a patient</label>
								<Select
									value={this.state.selectedPatientOption}
									onChange={this.handlePatientChange}
									options={this.state.patientOptions}
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
									disabled={this.state.patientDataDisabled}
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
									disabled={this.state.patientDataDisabled}
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