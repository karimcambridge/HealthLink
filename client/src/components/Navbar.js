import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, logOut } from './UserFunctions';

class Navbar extends Component {
    userLogout(e) {
        e.preventDefault();
        logOut();
        this.props.history.push(`/login`);
    }

    render() {
        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="/" onClick={this.userLogout.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mainNavBar"
                    aria-controls="mainNavBar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div id="mainNavBar" class="collapse navbar-collapse">
                    <div className="collapse navbar-collapse justify-content-md-center">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    <h2>HealthLink</h2>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="justify-content-md-end">
                        {/*this.props.location.pathname !== '/' ? homeLink : null*/}
                        {isAuthenticated() ? userLink : null}
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);