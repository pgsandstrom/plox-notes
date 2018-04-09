import {
  SET_ID,
  ADD,
  REMOVE,
  SWITCH_CHECK,
  SET_FOCUS,
  MOVE_NOTE,
  EDIT_NOTE,
  LOAD_NOTE,
  SET_NOTES,
  SAVE_NOTE,
  SET_ERROR,
  UNDO,
} from './constants';
import { sendEvent } from './websocket';
import { pending, fulfilled } from './errorHandlerMiddleware';

export const setId = id => (dispatch) => {
  dispatch({
    type: SET_ID,
    payload: {
      id,
    },
  });
  sendEvent('setId', id);
};

export const addNote = index => (dispatch) => {
  dispatch({
    type: ADD,
    payload: {
      index,
      note: {
        id: Math.random().toString(36).substr(2, 6),
        text: '',
        checked: false,
      },
    },
  });
  dispatch(uploadNotes());
  // setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0); // Scroll to bottom
};

export const removeNote = index => (dispatch) => {
  dispatch({
    type: REMOVE,
    payload: {
      index,
    },
  });
  dispatch(uploadNotes());
};

export const switchChecked = index => (dispatch) => {
  dispatch({
    type: SWITCH_CHECK,
    payload: {
      index,
    },
  });
  dispatch(uploadNotes());
};

export const setFocus = index => ({
  type: SET_FOCUS,
  payload: {
    index,
  },
});

export const moveNote = (fromIndex, toIndex) => (dispatch) => {
  dispatch({
    type: MOVE_NOTE,
    payload: {
      fromIndex,
      toIndex,
    },
  });
  dispatch(uploadNotes());
};

export const editNote = (index, text) => (dispatch) => {
  dispatch({
    type: EDIT_NOTE,
    payload: {
      index,
      text,
    },
  });
  dispatch(uploadNotes());
};

export const undo = () => (dispatch) => {
  dispatch({
    type: UNDO,
  });
  dispatch(uploadNotes());
};

export const loadThroughRest = id => ({
  type: LOAD_NOTE,
  payload: fetch(`/api/v1/note/${id}`, {
    credentials: 'same-origin',
  }).then(data => data.json()),
});

export const setNotes = data => ({
  type: SET_NOTES,
  payload: {
    data,
  },
});

export const save = (id, notes) => ({
  type: SAVE_NOTE,
  payload: fetch(`/api/v1/note/${id}`, {
    method: 'POST',
    body: JSON.stringify(notes),
    credentials: 'same-origin',
  }),
});

export const setError = (text, message, code) => (dispatch) => {
  if (text !== '' && text != null) {
    console.log(`Error text: ${text}`); // eslint-disable-line no-console
  }
  if (message !== '' && message != null) {
    console.log(`Error message: ${message}`); // eslint-disable-line no-console
  }
  if (code !== 0 && code != null) {
    console.log(`Error code: ${code}`); // eslint-disable-line no-console
  }

  dispatch({
    type: SET_ERROR,
    payload: {
      text,
    },
  });
};

const uploadNotes = () => (dispatch, getState) => {
  dispatch({
    type: pending(SAVE_NOTE),
  });
  const cb = () => {
    // Can this callback detect errors? Seems like "no"
    dispatch({
      type: fulfilled(SAVE_NOTE),
    });
  };
  sendEvent(
    'post',
    { id: getState().noteReducer.id, notes: getState().noteReducer.notes },
    cb,
  );
};
