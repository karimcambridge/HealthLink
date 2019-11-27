import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

class Patient extends Component {
    constructor() {
        super();
        this.onGoBack = this.onGoBack.bind(this);
    }

    onGoBack(e) {
        e.preventDefault();

        this.props.history.goBack();
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
                    <Col md={8} className="mt-4 mx-auto">
                        <Card style={{ width: '18rem' }} >
                            <Card.Header>Patient</Card.Header>
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
                </Row>
            </Container>
        )
    }
}

export default Patient;