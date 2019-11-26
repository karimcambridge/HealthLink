import React, { Component } from 'react';
import Search from './helpers/Search';
import Moment from 'moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

class Patient extends Component {
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title><a href="#">{this.props.patient.first_name} {this.props.patient.last_name}</a></Card.Title>
                    <ListGroup horizontal>
                        <ListGroup.Item><strong>National ID:</strong> {this.props.patient.national_id}</ListGroup.Item>
                        <ListGroup.Item><strong>Date of Birth:</strong> {this.props.patient.dob}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}

class PatientsList extends Component {
    constructor() {
        super();
        this.state = {
            patients: [],
            visiblePatients: []
        }
    }

    componentDidMount() {
        this.fetchData();
        this.setState({ visiblePatients: [] });
    }

    fetchData() {
        return fetch('/patients/getall')
            .then(response => response.json())
            .then(parsedJSON => {
                parsedJSON.forEach(patient => {
                    patient.dob = Moment(patient.dob).utc().format('YYYY-MM-DD');
                });
                this.setState({ patients: parsedJSON });
                console.log('data fetched ' + JSON.stringify(this.state.patients));
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Row>
                    <Col sm={12} mb={3}>
                        <Search placeholder="Enter a patient's national ID, first name or last name to search" list={this.state.patients} filterList={(query, patient) => (query.length && (patient.national_id.toLowerCase().search(query) !== -1 || patient.first_name.toLowerCase().search(query) !== -1 || patient.last_name.toLowerCase().search(query) !== -1))} onListUpdate={patients => this.setState({ visiblePatients: patients })} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} mb={3}>
                        {this.state.visiblePatients ? this.state.visiblePatients.map(patient => {
                            return <Patient patient={patient} key={patient.id} />;
                        }) : 'Empty'}
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
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={10} className="mt-4 mx-auto">
                        <PatientsList />
                    </Col>
                    <Col sm={2} className="mt-4 mx-auto">
                        <Button variant="danger" size="md">
                            Create Patient
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PatientSearch;