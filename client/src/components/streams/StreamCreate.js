// @ts-nocheck
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createStream } from '../../actions';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';

class StreamCreate extends Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  renderError = ({ error, touched }) => {
    return touched && error ? (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    ) : null;
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.touched && meta.error ? 'error' : ''}`;
    return (
      <>
        <div className={className}>
          <label>{label}</label>
          <input {...input} />
        </div>
        {this.renderError(meta)}
      </>
    );
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Create Stream</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title.';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description.';
  }
  return errors;
};

const formWrapped = reduxForm({ form: 'streamCreate', validate })(StreamCreate);

export default connect(null, { createStream })(formWrapped);
