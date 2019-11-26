import React, { Component } from 'react';

class Search extends Component {
    componentDidMount() {
        const { list, filterList, onListUpdate } = this.props;
        onListUpdate(list);
    }

    handleInputChange = (event) => {
        const query = event.currentTarget.value;
        const { list, filterList, onListUpdate } = this.props;

        const filteredList = list.filter(field => filterList(query, field));

        onListUpdate(filteredList);
    };

    render() {
        return (
            <form>
                <input onChange={this.handleInputChange} />
            </form>
        );
    }
}

export default Search;

/*
This revised version of Search takes some additional props which allows it to be reused as required.
In addition to the projects prop, you also pass filterProject and onUpdateProjects callbacks which are provided by calling 
code. The filterProject callback allows you to provide custom filtering logic for each <Search/> component rendered.
The onUpdateProjects callback basically returns the "filtered list" of projects, suitable for rendering in the parent 
component (ie <ProjectList/>).

The only other significant change here is the addition of visibleProjects to the state of <ProjectList/> which tracks 
the visible (ie filtered) projects from the original list of projects passed to <ProjectList/>: 
*/