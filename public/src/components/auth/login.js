import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser } from '../../actions/auth';

const form = reduxForm({ form: 'login', });

class Login extends Component {
    handleFormSubmit(formProps) {
        this.props.loginUser(formProps);
    }

    showError() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error. </strong>{this.props.errorMessage}</span>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="container">
                <form className="form-signin" name="form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <h2 className="form-signin-heading">LOGIN</h2>
                    <label for="inputEmail" className="sr-only">Email</label>
                    <Field id="inputEmail" name="inputEmail" type="email" className="form-control" placeholder="Email address" component="input" />
                    <label for="inputPassword" className="sr-only">Password</label>
                    <Field id="inputPassword" name="inputPassword" type="password" className="form-control" placeholder="Password" component="input" />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                    {this.showError()}
                </form>
            </div>
        );
    }
    
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message,
        authenticated: state.auth.authenticated,
    }
};

export default connect(mapStateToProps, { loginUser })(form(Login))