// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    // initialize library
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '610323719817-amp6errhskvn4pff5lu8q4utu3m8ugqv.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = (isSignedIn) => {
    let userId = this.auth.currentUser.get().getId();
    isSignedIn ? this.props.signIn(userId) : this.props.signOut();
  };
  renderAuthButton = () => {
    return this.props.isSignedIn ? (
      <button className="ui red google icon" onClick={this.onSignOutClick}>
        <i className="google icon" />
        Sign Out
      </button>
    ) : (
      <button className="ui red google icon" onClick={this.onSignInClick}>
        <i className="google icon" />
        Sign in with google
      </button>
    );
  };
  onSignInClick = () => {
    return this.auth.signIn();
  };
  onSignOutClick = () => {
    return this.auth.signOut();
  };
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
