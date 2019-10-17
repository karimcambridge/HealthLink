import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Landing extends Component {
    render() {
        return (
            <div className="container">
               <h1 className="text-center">HealthLink</h1>
                <FontAwesomeIcon icon="spinner" size="6x" pulse  />
            </div>
        )
    }
};

export default Landing;