import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Moment from 'moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { getAllPatients } from './functions/PatientFunctions';
import { Search, FailedSearchCritera } from '../helpers/Search';

class Patient extends Component {
	parsedContactInformation() {
		return JSON.parse(this.props.patient.contact_information);
	}

	render() {
		return (
			<Card>
				<Card.Body>
					<Card.Title>
						<Link to={`patient/${this.props.patient.id}`}>
							{this.props.patient.first_name} {this.props.patient.last_name}
						</Link>
					</Card.Title>
					<ListGroup horizontal>
						<ListGroup.Item><strong>National ID:</strong> {this.props.patient.national_id}</ListGroup.Item>
						<ListGroup.Item><strong>Date of Birth:</strong> {this.props.patient.dob}</ListGroup.Item>
						{this.props.patient.address ? <ListGroup.Item><strong>Address:</strong> {this.props.patient.address}</ListGroup.Item> : ''}
						{this.props.patient.contact_information ? <ListGroup.Item><strong>Contact Information:</strong> {this.parsedContactInformation()['phone_no_1']}</ListGroup.Item> : ''}
					</ListGroup>
				</Card.Body>
			</Card>
		);
	}
}

class PatientsList extends Component {
	_isMounted = false;

	constructor() {
		super();
		this.state = {
			preloaded: false,
			patients: [],
			visiblePatients: [],
			query: ''
		}
	}

	componentDidMount() {
		this._isMounted = true;
		getAllPatients()
			.then(parsedJSON => {
				if(this._isMounted) {
					parsedJSON.forEach(patient => {
						patient.dob = Moment(patient.dob).utc().format('YYYY-MM-DD');
					});
					this.setState({ preloaded: true, patients: parsedJSON, visiblePatients: [] });
					console.log('[PATIENTS LOADED]: ' + JSON.stringify(this.state.patients));
				}
			})
			.catch(error => console.log(error))
		;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	customSearchHandler(query, patient) {
		return (patient.national_id.toLowerCase().search(query) !== -1 || patient.first_name.toLowerCase().search(query) !== -1 || patient.last_name.toLowerCase().search(query) !== -1)
	}

	render() {
		return (
			<div>
				<Row>
					<Col sm={12} mb={3}>
						<Search placeholder="Enter a patient's national ID, first name or last name to search" list={this.state.patients} filterList={(query, patient) => (query.length && this.customSearchHandler(query, patient))} onListUpdate={(patients, query) => this.setState({ visiblePatients: patients, query: query })} disabled={!this.state.preloaded} />
					</Col>
				</Row>
				<Row>
					<Col sm={12} mb={3}>
						{
							this.state.preloaded && this.state.patients.length
								? (this.state.visiblePatients.length && this.state.query.length
									? this.state.visiblePatients.map(patient => {
										return <Patient patient={patient} key={patient.id} />;
										})
									: <FailedSearchCritera description="patients" query={this.state.query} />) 
								: <FailedSearchCritera description="patients" preloaded={this.state.preloaded} empty={!Boolean(this.state.patients.length)}/>
						}
					</Col>
				</Row>
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
		this.onGoBack = this.onGoBack.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onGoBack(e) {
		e.preventDefault();

		this.props.history.goBack();
	}

	render() {
		return (
			<Container>
				<Row>
					<Col sm={1} className="mt-4">
						<Button variant="info" size="lg" onClick={this.onGoBack}>
							Go Back
                        </Button>
					</Col>
					<Col sm={8} className="mt-4 mx-auto">
						<PatientsList />
					</Col>
					<Col sm={1} className="mt-4 mx-auto">
						<Link to="/patients/create">
							<Button variant="danger" size="md">
								Create Patient
							</Button>
						</Link>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default PatientSearch;