import update from 'immutability-helper';

import { ADD, REMOVE, SWITCH_CHECK, EDIT_NOTE, LOAD_NOTE, SAVE_NOTE } from './constants';
import { pending, rejected, fulfilled } from './errorHandlerMiddleware';

const initialState = {
  notes: [{
    text: 'laddar...',
    checked: false,
  }],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, notes: [...state.notes, { text: '', checked: false }] };
    case REMOVE:
      return update(state, { notes: { $splice: [[action.payload.index, 1]] } });
    case SWITCH_CHECK: {
      const currentChecked = state.notes[action.payload.index].checked;
      return update(state, { notes: { [action.payload.index]: { checked: { $set: !currentChecked } } } });
    }
    case EDIT_NOTE:
      return update(state, { notes: { [action.payload.index]: { text: { $set: action.payload.text } } } });
    case fulfilled(LOAD_NOTE):
      return { ...state, notes: action.payload };
    case fulfilled(SAVE_NOTE):
      return state; // TODO give feedback
    default:
      return state;
  }
};
