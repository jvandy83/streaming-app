import React, { Component, useEffect } from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';

class StreamDelete extends Component {
  componentDidMount = () => {
    this.props.fetchStream(this.props.match.params.id);
  };
  handleDelete = () => {
    const id = this.props && this.props.match.params.id;
    this.props.deleteStream(id);
  };
  renderActions = () => {
    return (
      <>
        <button onClick={this.handleDelete} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  };
  render() {
    const streamTitle = !this.props.stream ? '' : this.props.stream.title;
    return (
      <Modal
        title="Delete Stream"
        content="Are you sure you want to delete this stream?"
        streamTitle={streamTitle}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapState = ({ streams }, ownProps) => {
  return {
    stream: streams[ownProps.match.params.id]
  };
};

export default connect(mapState, { fetchStream, deleteStream })(StreamDelete);
