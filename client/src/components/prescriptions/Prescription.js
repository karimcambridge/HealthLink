import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { getPrescription } from './functions/PrescriptionFunctions';

class Prescription extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			prescriptionId: props.location.id,
			prescription: {}
		}
		console.log(`Init prescription: ${this.state.prescriptionId}`);
		this.onGoBack = this.onGoBack.bind(this);
	}

	formatPrescriptionData(prescription) {
		const
			data = JSON.parse(prescription.data),
			parsedData = {
				first_name: data.first_name,
				last_name: data.last_name,
				address: data.address,
				drug_names: data.drug_names,
				note: data.note
			}
		;
		return parsedData;
	}

	componentDidMount() {
		this._isMounted = true;
		getPrescription(this.state.prescriptionId)
			.then(parsedJSON => {
				if (this._isMounted) {
					if (parsedJSON.error) {
						console.log(`[PRESCRIPTION LOADING ERROR]: ` + parsedJSON.error);
					} else {
						this.state.prescription = parsedJSON;
						this.state.prescription.created = Moment(this.state.prescription.created).utc().format('YYYY-MM-DD');
						this.state.prescription.parsedData = this.formatPrescriptionData(this.state.prescription);
						this.state.prescription.referenceNumber = () => {
							return this.zeroPad(this.state.prescription.id, 10);
						};
						this.setState({ loaded: true } );
						console.log(`[PRESCRIPTION ${this.state.prescription.id} LOADED]: ` + JSON.stringify(this.state.prescription));
					}
				}
			})
			.catch(error => console.log(error))
		;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	zeroPad(num, places) {
		return String(num).padStart(places, '0');
	}

	onGoBack(e) {
		e.preventDefault();

		this.props.history.goBack();
	}

	render() {
		return (
			this.state.loaded === false
				? (
					<FontAwesomeIcon style={{ display: 'flex', height: '20vh' }} className="mx-auto" icon="spinner" size="2x" pulse />
				)
				:
				<Container>
					<Row>
						<Col md="auto" className="mt-4">
							<Button variant="info" size="lg" onClick={this.onGoBack}>
								Go Back
							</Button>
						</Col>
					</Row>
					<Col md={4} className="mt-4 mx-auto">
						<Card style={{ width: '18rem' }} >
							<Card.Header>Prescription #{this.state.prescription.referenceNumber()}</Card.Header>
							<Card.Body>
								<Card.Title>{this.state.prescription.parsedData.first_name} {this.state.prescription.parsedData.last_name}</Card.Title>
							</Card.Body>
							<ListGroup variant="list-group-flush">
								<ListGroup.Item><strong>Address:</strong> {this.state.prescription.parsedData.address}</ListGroup.Item>
								<ListGroup.Item><strong>Drug Name:</strong> {this.state.prescription.parsedData.drug_names}</ListGroup.Item>
								<ListGroup.Item><strong>Note:</strong> {this.state.prescription.parsedData.note}</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Container>
		)
	}
}

export default Prescription;