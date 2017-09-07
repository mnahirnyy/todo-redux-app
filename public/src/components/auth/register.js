import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions/auth';

const form = reduxForm({ form: 'register', validate });
const renderField = field => {
    <div>
        <input className="form-control" {...field.input} />
        {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
};
const validate = (formProps) => {
    const errors = {};
  
    if (!formProps.firstName) {
      errors.firstName = 'Please enter a first name';
    }
  
    if (!formProps.lastName) {
      errors.lastName = 'Please enter a last name';
    }
  
    if (!formProps.email) {
      errors.email = 'Please enter an email';
    }
  
    if (!formProps.password) {
      errors.password = 'Please enter a password';
    }
  
    return errors;
}

class Register extends Component {
    handleFormSubmit(formProps) {
        this.props.registerUser(formProps);
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
                    <h2 className="form-signin-heading">Please sign up</h2>
                    <div className="form-group">
                        <label for="inputFirstname" className="sr-only">Firstname</label>
                        <Field id="inputFirstname" name="inputFirstname" type="text" className="form-control" placeholder="First name" component="input" />
                    </div>
                    <div className="form-group">
                        <label for="inputLastname" className="sr-only">Lastname</label>
                        <Field id="inputLastname" name="inputLastname" type="text" className="form-control" placeholder="Last name" component="input" />
                    </div>
                    <div className="form-group">
                        <label for="inputEmail" className="sr-only">Email</label>
                        <Field id="inputEmail" name="inputEmail" type="email" className="form-control" placeholder="Email address" component="input" />
                    </div>
                    <div className="form-group">
                        <label for="inputPassword" className="sr-only">Password</label>
                        <Field id="inputPassword" name="inputPassword" type="password" className="form-control" placeholder="Password" component="input" />
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-primary btn-block" type="submit">Register</button>
                        </div>
                    </div>
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

export default connect(mapStateToProps, { registerUser })(form(Register))