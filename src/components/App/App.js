import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import UserPage from '../UserPage/UserPage';
import ManageClients from '../ManageClients/ManageClients';
import ResetPassword from '../ResetPassword/ResetPassword';
import NewPassword from '../ResetPassword/NewPassword'; 
import GridContainer from '../GridContainer/GridContainer'; 
import Register from '../RegisterPage/RegisterPage';
import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <GridContainer>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
           
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/clients"
              component={ManageClients}
            />
             <Route
              exact
              path="/resetpassword/"
              component={ResetPassword}
            />
             <Route
              exact
              path="/resetpassword/:token"
              component={NewPassword}
            />
            <Route exact path="/register" component={Register}/>
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404: Page Not Found</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
      </GridContainer>
  )}
}

export default connect()(App);
