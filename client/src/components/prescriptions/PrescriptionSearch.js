import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Moment from 'moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { getAllPrescriptions } from './functions/PrescriptionFunctions';
import Search from '../helpers/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FailedSearchCritera extends Component {
    render() {
        return (
            this.props.preloaded === false
                ? (
                    <FontAwesomeIcon style={{ display: 'flex', height: '20vh' }} className="mx-auto" icon="spinner" size="2x" pulse />
                )
                : this.props.empty
                    ? (
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    There are currently no prescriptions in the database.
							</Card.Title>
                            </Card.Header>
                        </Card>
                    )
                    : this.props.query.length ? (
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    No prescriptions found with the search criteria '{this.props.query}'
							</Card.Title>
                            </Card.Header>
                        </Card>
                    )
                        : ''
        );
    }
}

class Prescription extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                        <Link to={`prescription/${this.props.prescription.id}`}>
                            {this.props.prescription.parsedData.first_name} {this.props.prescription.parsedData.last_name}
                        </Link>
                    </Card.Title>
                    <ListGroup horizontal>
                        <ListGroup.Item><strong>Date created:</strong> {this.props.prescription.created}</ListGroup.Item>
                        {this.props.prescription.parsedData.address ? <ListGroup.Item><strong>Address:</strong> {this.props.prescription.parsedData.address}</ListGroup.Item> : ''}
                        {this.props.prescription.parsedData.drug_names ? <ListGroup.Item><strong>Drug Information:</strong> {this.props.prescription.parsedData.drug_names}</ListGroup.Item> : ''}
                        {this.props.prescription.parsedData.note ? <ListGroup.Item><strong>Note:</strong> {this.props.prescription.parsedData.note}</ListGroup.Item> : ''}
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}

class PrescriptionList extends Component {
    constructor() {
        super();
        this.state = {
            preloaded: false,
            prescriptions: [],
            visiblePrescriptions: [],
            query: ''
        }
    }

    componentDidMount() {
        getAllPrescriptions()
            .then(parsedJSON => {
                parsedJSON.forEach(prescription => {
                    prescription.created = Moment(prescription.created).utc().format('YYYY-MM-DD');
                    prescription.parsedData = this.formatPrescriptionData(prescription);
                });
                this.setState({ preloaded: true, prescriptions: parsedJSON, visiblePrescriptions: [] });
                console.log('[PRESCRIPTIONS LOADED]: ' + JSON.stringify(this.state.prescriptions));
            })
            .catch(error => console.log(error))
        ;
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

    customSearchHandler(query, prescription) {
        return (prescription.parsedData.drug_names.toLowerCase().search(query) !== -1 || prescription.parsedData.first_name.toLowerCase().search(query) !== -1 || prescription.parsedData.last_name.toLowerCase().search(query) !== -1)
    }

    render() {
        return (
            <div>
                <Row>
                    <Col sm={12} mb={3}>
                        <Search placeholder="Describe the precription you are looking for..." list={this.state.prescriptions} filterList={(query, prescription) => (query.length && this.customSearchHandler(query, prescription))} onListUpdate={(prescriptions, query) => this.setState({ visiblePrescriptions: prescriptions, query: query })} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} mb={3}>
                        {
                            this.state.preloaded && this.state.prescriptions.length
                                ? (this.state.visiblePrescriptions.length && this.state.query.length
                                    ? this.state.visiblePrescriptions.map(prescription => {
                                        return <Prescription prescription={prescription} key={prescription.id} />;
                                    })
                                    : <FailedSearchCritera query={this.state.query} />)
                                : <FailedSearchCritera preloaded={this.state.preloaded} empty={!Boolean(this.state.prescriptions.length)} />
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

class PrescriptionSearch extends Component {
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
                        <PrescriptionList />
                    </Col>
                    <Col sm={1} className="mt-4 mx-auto">
                        <Link to="/prescriptioncreate">
                            <Button variant="danger" size="md">
                                Create Prescription
							</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PrescriptionSearch;