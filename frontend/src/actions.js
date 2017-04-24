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
} from './constants';
import { sendEvent } from './websocket';

export const setId = id => (dispatch) => {
  dispatch({
    type: SET_ID,
    payload: {
      id,
    },
  });
  sendEvent('setId', id);
};

export const addNote = index => (dispatch, getState) => {
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
  uploadNotes(getState);
  // setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0); // Scroll to bottom
};

export const removeNote = index => (dispatch, getState) => {
  dispatch({
    type: REMOVE,
    payload: {
      index,
    },
  });
  uploadNotes(getState);
};

export const switchChecked = index => (dispatch, getState) => {
  dispatch({
    type: SWITCH_CHECK,
    payload: {
      index,
    },
  });
  uploadNotes(getState);
};

export const setFocus = index => ({
  type: SET_FOCUS,
  payload: {
    index,
  },
});

export const moveNote = (fromIndex, toIndex) => (dispatch, getState) => {
  dispatch({
    type: MOVE_NOTE,
    payload: {
      fromIndex,
      toIndex,
    },
  });
  uploadNotes(getState);
};

export const editNote = (index, text) => (dispatch, getState) => {
  dispatch({
    type: EDIT_NOTE,
    payload: {
      index,
      text,
    },
  });
  uploadNotes(getState);
};

export const load = id => ({
  type: LOAD_NOTE,
  payload: fetch(`/api/v1/note/${id}`, { credentials: 'same-origin' })
    .then(data => data.json()),
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

export const setError = text => ({
  type: SET_ERROR,
  payload: {
    text,
  },
});

const uploadNotes = (getState) => {
  sendEvent('post', { id: getState().noteReducer.id, notes: getState().noteReducer.notes });
};
