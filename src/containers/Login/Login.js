import React, { Component } from 'react';
import './Login.scss';
import { Card, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { loginAction } from '../../actions/auth'; 
import { Link } from 'react-router-dom';
class Login extends Component {
  constructor(props) {

    super(props);
    this.state = { 
        email: '',
        password: ''
    };
    this.login = this.login.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

  }

  login() {
    this.props.loginFunction(this.state.email, this.state.password);
  }
    
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'success'){
        this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
        <div className="general">        
            <Card className="container">
                <CardText className="input-container">
                    <TextField 
                        name="email" 
                        value={this.state.email}  
                        onChange={this.handleChangeEmail} 
                        errorText={this.props.status === 'error' ?  "Логин или пароль неправильные": ""}
                        floatingLabelText="Login" 
                    />
                    <TextField 
                        name="password" 
                        value={this.state.password}  
                        onChange={this.handleChangePassword} 
                        floatingLabelText="Password"
                        type="password" 
                    /> 
                </CardText>
                <CardActions>
                    <RaisedButton onClick={this.login} className="login-button" label="Login" primary={true} />
                </CardActions>
            </Card>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return { 
        token: state.auth.token,
        status: state.auth.status
    };
}
function mapDispathToProps(dispatch) {
    return {
        loginFunction: function (email, password) {
            dispatch(loginAction(email, password));
        }
    };
}

export default connect(mapStateToProps,mapDispathToProps)(Login);

