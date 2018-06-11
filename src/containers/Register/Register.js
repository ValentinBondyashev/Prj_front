import React, { Component } from 'react';
import './Register.scss';
import { Card, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Button } from 'primereact/components/button/Button';
import { registerAction } from '../../actions/register'; 
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {

    super(props);
    this.state = { 
        email: '',
        password: ''
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

  }

 
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.status === 'success'){
        this.props.history.push("/dashboard");
    }
  }

  register = () => {
    this.props.registerFunction(this.state.email, this.state.password);
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  handleChangePassword = (e) =>{
    this.setState({ password: e.target.value });
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
                    <RaisedButton onClick={this.register} className="register-button" label="Register" primary={true} />
                    <Button><Link className="link_login" to='/'>Sign in</Link></Button>
                </CardActions>
            </Card>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return { 
        status: state.register.status,
    };
}
function mapDispathToProps(dispatch) {
    return {
        registerFunction: function (email, password){
            dispatch(registerAction(email, password));
        }
    };
}

export default connect(mapStateToProps,mapDispathToProps)(Register);

