import {
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM
} from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_STREAM:
      return { ...state, [payload.id]: payload };
    case FETCH_STREAMS:
      const streams = {};
      payload.forEach((stream) => {
        streams[stream['id']] = stream;
      });
      return { ...state, ...streams };
    case CREATE_STREAM:
      return { ...state, [payload.id]: payload };
    case EDIT_STREAM:
      return { ...state, [payload.id]: payload };
    case DELETE_STREAM:
      // @ts-ignore
      return Object.entries(state).filter(
        (stream) => stream[0] !== String(payload)
      );
    default:
      return state;
  }
};
