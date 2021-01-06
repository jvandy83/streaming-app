import React, { useEffect } from 'react';
import { fetchStream, editStream } from '../../actions';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';

const StreamEdit = (props) => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  const onSubmit = (formValues) => {
    props.editStream(props.match.params.id, formValues);
  };
  const getProps = () => {
    const { title, description } = props.stream && props.stream;
    return {
      title,
      description
    };
  };
  return !props.stream ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h3>Edit Your Stream</h3>
      <StreamForm initialValues={getProps()} onSubmit={onSubmit} />
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params['id']]
  };
};

export default connect(mapState, { fetchStream, editStream })(StreamEdit);
