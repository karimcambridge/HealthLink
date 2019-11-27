import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { getAllPrescriptions, fixPrescription } from './functions/PrescriptionFunctions';
import { Search, FailedSearchCritera } from '../helpers/Search';

class Prescription extends Component {
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                        <Link
                            to={{
                                pathname: `/prescription/${this.props.prescription.id}`,
                                id: this.props.prescription.id
                            }}>
                            {this.props.prescription.parsedData.first_name} {this.props.prescription.parsedData.last_name}
                        </Link>
                    </Card.Title>
                    <ListGroup horizontal>
                        <ListGroup.Item><strong>Reference #:</strong> #{this.props.prescription.referenceNumber()}</ListGroup.Item>
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
    _isMounted = false;

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
        this._isMounted = true;
        getAllPrescriptions()
            .then(parsedJSON => {
                if(this._isMounted) {
                    parsedJSON.forEach(prescription => {
                        prescription = fixPrescription(prescription);
                    });
                    this.setState({ preloaded: true, prescriptions: parsedJSON, visiblePrescriptions: [] });
                    //console.log('[PRESCRIPTIONS LOADED]: ' + JSON.stringify(this.state.prescriptions));
                }
            })
            .catch(error => console.log(error))
        ;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    customSearchHandler(query, prescription) {
        return (prescription.parsedData.drug_names.toLowerCase().search(query) !== -1 || prescription.parsedData.first_name.toLowerCase().search(query) !== -1 || prescription.parsedData.last_name.toLowerCase().search(query) !== -1)
    }

    render() {
        return (
            <div>
                <Row>
                    <Col sm={12} mb={3}>
                        <Search placeholder="Describe the precription you are looking for..." list={this.state.prescriptions} filterList={(query, prescription) => (query.length && this.customSearchHandler(query, prescription))} onListUpdate={(prescriptions, query) => this.setState({ visiblePrescriptions: prescriptions, query: query })} disabled={!this.state.preloaded} />
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
                                    : <FailedSearchCritera description="prescriptions" query={this.state.query} />)
                                : <FailedSearchCritera description="prescriptions" preloaded={this.state.preloaded} empty={!Boolean(this.state.prescriptions.length)} />
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
                        <Link to="/prescriptions/create">
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