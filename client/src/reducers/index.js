import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamsReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
  // authReducer gets called when app boots up
  // this function runs and returns an object
  // { isSignedIn: true | false }
  // so the state object looks like this
  /*
  { state: {
      auth: {
        isSignedIn: true | false
      }
    }
  }
  */
});
