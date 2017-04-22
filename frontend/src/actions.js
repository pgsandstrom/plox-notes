import { ADD, REMOVE, SWITCH_CHECK, EDIT_NOTE, LOAD_NOTE, SAVE_NOTE } from './constants';

export const addNote = index => (dispatch) => {
  dispatch({
    type: ADD,
    payload: {
      index,
    },
  });
  // setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0); // Scroll to bottom
};

export const removeNote = index => ({
  type: REMOVE,
  payload: {
    index,
  },
});

export const switchChecked = index => ({
  type: SWITCH_CHECK,
  payload: {
    index,
  },
});

export const editNote = (index, text) => ({
  type: EDIT_NOTE,
  payload: {
    index,
    text,
  },
});

export const load = id => ({
  type: LOAD_NOTE,
  payload: fetch(`/api/v1/note/${id}`, { credentials: 'same-origin' })
    .then(data => data.json()),

});

export const save = (id, notes) => ({
  type: SAVE_NOTE,
  payload: fetch(`/api/v1/note/${id}`, {
    method: 'POST',
    body: JSON.stringify(notes),
    credentials: 'same-origin',
  }),
});
