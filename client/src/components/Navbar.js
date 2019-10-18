import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push(`/`);
    }

    render() {
        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
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
                        {localStorage.usertoken ? userLink : null}
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);