import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const PrivateRoute = ({ component: Component, ...rest }) => (
<Route
      {...rest}
      render={props =>
        rest.token != '' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );


  function mapStateToProps(state) {
        return { 
            token: state.auth.token,
        };
    }


export default connect(mapStateToProps)(PrivateRoute);