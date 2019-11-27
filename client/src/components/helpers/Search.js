import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';

export class Search extends Component {
    constructor() {
        super();
        this.state = {
            query: ''
        };
    }

    componentDidMount() {
        const { list, onListUpdate } = this.props;
        onListUpdate(list, this.state.query);
    }

    handleInputChange = (event) => {
        this.setState({ query: event.target.value }, () => {
            const { list, filterList, onListUpdate } = this.props;

            const filteredList = list.filter(field => filterList(this.state.query, field));

            onListUpdate(filteredList, this.state.query);
        });
    };

    render() {
        return (
            <form>
                <input value={this.state.query} type="text" className="form-control" placeholder={this.props.placeholder} onChange={this.handleInputChange} disabled={this.props.disabled}/>
            </form>
        );
    }
}

export class FailedSearchCritera extends Component {
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
                                    There are currently no {this.props.description} in the database.
							</Card.Title>
                            </Card.Header>
                        </Card>
                    )
                    : this.props.query.length ? (
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    No {this.props.description} found with the search criteria '{this.props.query}'
							</Card.Title>
                            </Card.Header>
                        </Card>
                    )
                        : ''
        );
    }
}

/*
This revised version of Search takes some additional props which allows it to be reused as required.
In addition to the projects prop, you also pass filterProject and onUpdateProjects callbacks which are provided by calling 
code. The filterProject callback allows you to provide custom filtering logic for each <Search/> component rendered.
The onUpdateProjects callback basically returns the "filtered list" of projects, suitable for rendering in the parent 
component (ie <ProjectList/>).

The only other significant change here is the addition of visibleProjects to the state of <ProjectList/> which tracks 
the visible (ie filtered) projects from the original list of projects passed to <ProjectList/>: 
*/