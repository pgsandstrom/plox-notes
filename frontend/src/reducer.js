import update from 'immutability-helper';

import {
  ADD,
  REMOVE,
  SWITCH_CHECK,
  SET_FOCUS,
  MOVE_NOTE,
  EDIT_NOTE,
  LOAD_NOTE,
  SAVE_NOTE,
} from './constants';
import { pending, rejected, fulfilled } from './errorHandlerMiddleware';

const initialState = {
  notes: [{
    text: 'laddar...',
    checked: false,
  }],
  focusIndex: -1,
  saving: false,
  saved: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return update({ ...state, focusIndex: action.payload.index }, { notes: { $splice: [[action.payload.index, 0, { text: '', checked: false }]] } });
    case REMOVE:
      return update(state, { notes: { $splice: [[action.payload.index, 1]] } });
    case SWITCH_CHECK: {
      const currentChecked = state.notes[action.payload.index].checked;
      return update(state, { notes: { [action.payload.index]: { checked: { $set: !currentChecked } } } });
    }
    case SET_FOCUS:
      return { ...state, focusIndex: action.payload.index };
    case MOVE_NOTE: {
      const note = state.notes[action.payload.fromIndex];
      const tempState = update(state, { notes: { $splice: [[action.payload.fromIndex, 1]] } });
      return update(tempState, { notes: { $splice: [[action.payload.toIndex, 0, note]] } });
    }
    case EDIT_NOTE:
      return update(state, { notes: { [action.payload.index]: { text: { $set: action.payload.text } } } });
    case fulfilled(LOAD_NOTE):
      return { ...state, notes: action.payload };
    case pending(SAVE_NOTE):
      return { ...state, saving: true, saved: false };
    case fulfilled(SAVE_NOTE):
      return { ...state, saving: false, saved: true };
    case rejected(SAVE_NOTE):
      return { ...state, saving: false, saved: false };
    default:
      return state;
  }
};
