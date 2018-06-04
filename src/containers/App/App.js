import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from '../Login/Login';
import './App.scss';
import Dashboard from '../Dashboard/Dashboard';
import { connect } from 'react-redux';
import loginAction, { checkAuthAction } from '../../actions/auth'; 
import PrivateRoute from '../../components/Routes/private-route';
import NoAuthRoute from '../../components/Routes/no-auth-route';

class App extends Component {

  componentWillMount(){
    this.props.checkAuthFunction();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MuiThemeProvider>
            <Switch>
              <NoAuthRoute exact path='/' component={Login}/>
              <NoAuthRoute  path='/login' component={Login}/>
              <PrivateRoute  path='/dashboard' component={Dashboard}/>
            </Switch>
          </MuiThemeProvider>
          {this.props.children}
        </div>
      </BrowserRouter>
    );
  }
}


function mapStateToProps(state) {
  return { 
      token: state.auth.token,
  };
}
function mapDispathToProps(dispatch) {
  return {
      checkAuthFunction: () => {
          dispatch(checkAuthAction());
      }
  };
}

export default connect(mapStateToProps,mapDispathToProps)(App);
