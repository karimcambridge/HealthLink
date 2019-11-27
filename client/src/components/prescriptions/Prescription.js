import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { getPrescription, fixPrescription } from './functions/PrescriptionFunctions';

class Prescription extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			prescriptionId: props.location.id,
			prescription: {},
		};
		console.log(`Init prescription: ${this.state.prescriptionId}`);
		this.onGoBack = this.onGoBack.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		getPrescription(this.state.prescriptionId)
			.then(parsedJSON => {
				if (this._isMounted) {
					if (parsedJSON.error) {
						console.log(`[PRESCRIPTION LOADING ERROR]: ` + parsedJSON.error);
					} else {
						this.state.prescription = fixPrescription(parsedJSON);
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
						<Card>
							<Card.Header>Prescription <strong>#{this.state.prescription.referenceNumber()}</strong></Card.Header>
							<Card.Body>
								<Card.Title className="text-center">{this.state.prescription.parsedData.first_name} {this.state.prescription.parsedData.last_name}</Card.Title>
							</Card.Body>
							<ListGroup variant="list-group-flush">
								<ListGroup.Item><strong>Address:</strong><br />{this.state.prescription.parsedData.address}</ListGroup.Item>
								<ListGroup.Item><strong>Drug Names:</strong><br />{this.state.prescription.parsedData.drug_names}</ListGroup.Item>
								{this.state.prescription.parsedData.note ? <ListGroup.Item><strong>Note:</strong><br />{this.state.prescription.parsedData.note}</ListGroup.Item> : ''}
							</ListGroup>
						</Card>
					</Col>
				</Container>
		)
	}
}

export default Prescription;