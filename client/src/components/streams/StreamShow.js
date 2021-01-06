import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions/index';

const StreamShow = (props) => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);
  console.log(props);
  return <div>{props.stream && props.stream.title}</div>;
};

const mapState = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapState, { fetchStream })(StreamShow);
