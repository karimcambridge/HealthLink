import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getUserToken } from './functions/UserFunctions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            title: '',
            role: '',
            errors: {}
        };
    }

    componentDidMount() {
        const decoded = jwt_decode(getUserToken());
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
            title: decoded.title,
            role: decoded.role
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={8} className="mt-4 mx-auto">
                        <Card style={{ width: '18rem' }} >
                            <Card.Header>Profile</Card.Header>
                            <Card.Img variant="top" width="64" height="200" src="https://vignette.wikia.nocookie.net/goanimate-v2/images/d/d3/Crash_Bandicoot_-_PS3_Avatar.png/revision/latest/scale-to-width-down/185?cb=20180721082645" />
                            <Card.Body>
                                <Card.Title>{this.state.title} {this.state.first_name} {this.state.last_name}</Card.Title>
                            </Card.Body>
                            <ListGroup variant="list-group-flush">
                                <ListGroup.Item>{this.state.role}</ListGroup.Item>
                                <ListGroup.Item>{this.state.email}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col md={4} className="mt-4 mx-auto">
                        <div>
                            <Link to="/patients/search">
                                <Button variant="primary" size="lg">
                                    Find Patient
                                </Button>
                            </Link>
                        </div>
                        <div className="mt-5">
                            <Link to="/prescriptions/search">
                                <Button variant="info" size="lg">
                                    Find Prescription
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Profile;