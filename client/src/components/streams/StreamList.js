import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderList = () => {
    return this.props.streams.map((stream) => (
      <div className="item ui" key={Math.random()}>
        {this.renderAdmin(stream)}
        <i className="large middle aligned icon camera"></i>
        <div className="content">
          <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
          <div className="description">{stream.description}</div>
        </div>
      </div>
    ));
  };

  renderAdmin = (stream) => {
    const { currentUserId } = this.props;
    return currentUserId === stream.userId ? (
      <div className="right floated content">
        <Link
          className="ui yellow button"
          to={`/streams/edit/${stream.id}`}
          tabIndex="0"
        >
          Edit
        </Link>
        <Link
          to={`/streams/delete/${stream.id}`}
          className="ui button negative"
          tabIndex="0"
        >
          Delete
        </Link>
      </div>
    ) : (
      ''
    );
  };
  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.props.isSignedIn ? (
          <div>
            <Link className="ui button primary right floated" to="/streams/new">
              Create Stream
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ streams, auth }) => {
  return {
    streams: Object.values(streams),
    currentUserId: auth.userId,
    isSignedIn: auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
