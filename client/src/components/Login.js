import React, { Component } from 'react';
import { isAuthenticated, login } from './UserFunctions';
import Toast from 'react-bootstrap/Toast';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {
                loginFailed: false
            },
            //redirectToReferrer: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (isAuthenticated()) {
            //this.setState(() => ({
            //    redirectToReferrer: true
            //}));
            this.props.history.push(`/profile`);
        }
    }

    promptLoginFailure(errorMessage) {
        this.setState({
            errors: {
                loginFailed: true,
                errorMessage: errorMessage
            }
        });
        setTimeout(() => {
            this.setState({
                errors: {
                    loginFailed: false
                }
            });
        }, 3000);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        login(user)
            .then(response => {
                if (response) {
                    if (response.hasOwnProperty('error')) {
                        this.promptLoginFailure(response.error);
                        console.log('Login failed 0');
                        return;
                    }
                    //this.setState(() => ({
                    //    redirectToReferrer: true
                    //}));
                    this.props.history.push(`/profile`);
                } else {
                    this.promptLoginFailure();
                    console.log('Login failed 1');
                }
            })
            .catch(err => {
                this.promptLoginFailure();
                console.log('Login failed 2');
            })
    }

    render() {
        //if (this.state.redirectToReferrer === true) {
        //    return <Redirect to={{ pathname: '/profile', state: { from: this.props.location } }} />;
        //}

        const failedLoginNotification = (
            <div>
                <Toast style={{
                        margin: "0 auto",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "40%",
                    }} animation={true}>
                    <Toast.Header style={{color: 'red'}}>
                        <strong className="mr-auto">ERROR</strong>
                    </Toast.Header>
                    <Toast.Body style={{
                        textAlign: "center",
                    }}>
                        { this.state.errors.errorMessage ? this.state.errors.errorMessage : 'Invalid credentials.' }
                    </Toast.Body>
                </Toast>
            </div>
        );

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div class="mt-3"></div>
                        <form onSubmit={this.onSubmit} errors={this.state.errors}>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Sign in
                            </button>
                        </form>
                        <div class="mt-1 float-right">
                            Need to request an account?&nbsp;
                            <a href="/register">Click here</a>
                        </div>
                        { this.state.errors.loginFailed === true ? failedLoginNotification : null }
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;