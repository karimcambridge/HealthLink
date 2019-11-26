import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PatientSearch from './components/patients/PatientSearch';
import PatientCreate from './components/patients/PatientCreate';
import PrescriptionCreate from './components/prescriptions/PrescriptionCreate';
import PrescriptionSearch from './components/prescriptions/PrescriptionSearch';
import { isAuthenticated } from './components/functions/UserFunctions';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={isAuthenticated ? Login : Profile} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/patientsearch" component={PatientSearch} />
            <PrivateRoute exact path="/patientcreate" component={PatientCreate} />
            <PrivateRoute exact path="/prescriptioncreate" component={PrescriptionCreate} />
            <PrivateRoute exact path="/prescriptionsearch" component={PrescriptionSearch} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;