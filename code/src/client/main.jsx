import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import FlipMove from 'react-flip-move';

import { createWebsocket } from './websocket';
import {
  setId,
  addNote,
  removeNote,
  switchChecked,
  setFocus,
  moveNote,
  editNote,
  setNotes,
  save,
  setError,
  undo,
} from './actions';
import { CheckBox } from './widgets';

// TODO gotta use this shit: https://github.com/kriasoft/isomorphic-style-loader#getting-started
import './main.scss';

class Main extends React.Component {
  componentDidMount() {
    // "DidMount" makes it so the server doesnt run it
    createWebsocket(() => this.props.setId(this.props.match.params.noteid), this.props.setNotes, this.props.setError);
    // this.props.setId(this.props.match.params.noteid);
  }

  render() {
    const notes = this.props.initNotes || this.props.notes || [];
    const moveUncheckedToIndex = notes.filter(note => note.checked)
      .length;
    const moveCheckedToIndex = moveUncheckedToIndex - 1;
    const noteid = this.props.match.params.noteid;

    const duration = 200;
    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
    };

    const transitionStyles = {
      exiting: { opacity: 0, pointerEvents: 'none' },
      exited: { opacity: 0, pointerEvents: 'none' },
    };

    return (
      <div className="react-root">
        <Transition
          in={this.props.notesLoaded === false}
          timeout={duration}
        >
          {state => (
            <div
              className="disabler"
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            />
          )}
        </Transition>
        <div className="main">
          {this.props.error !== '' &&
            <div className="error">{this.props.error}</div>}
          <div className="title">{noteid}</div>
          <FlipMove
            className="notes"
            enterAnimation={false}
            leaveAnimation={false}
            duration={200}
          >
            <div className="grower" />
            {notes.map((note, index) =>
              (<Note
                key={note.id}
                text={note.text}
                checked={note.checked}
                index={index}
                lastNote={index === notes.length - 1}
                focusIndex={this.props.focusIndex}
                switchChecked={() => this.props.switchChecked(index)}
                setFocus={this.props.setFocus}
                moveNote={() =>
                  this.props.moveNote(
                    index,
                    note.checked ? moveCheckedToIndex : moveUncheckedToIndex,
                  )}
                addNote={() => this.props.addNote(index + 1)}
                delete={() => this.props.removeNote(index)}
                editNote={text => this.props.editNote(index, text)}
              />),
            )}
          </FlipMove>
          <div className="bottom">
            <button
              className="normalize-button standard-button button-add"
              onClick={() => this.props.addNote(notes.length)}
            >
              Add
            </button>
            <button
              className="normalize-button standard-button button-add"
              onClick={() => this.props.undo()}
              disabled={this.props.hasHistory === false}
            >
              Undo
            </button>
            <button
              className="normalize-button standard-button button-save"
              onClick={() => this.props.save(noteid, notes)}
            >
              Save
              {this.props.ongoingSaves > 0 &&
                <span className="button-icon">
                  <span className="fa fa-spinner fa-spin" />
                </span>}
              {this.props.saved &&
                <span className="button-icon">
                  <span className="fa fa-check" />
                </span>}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  match: PropTypes.object,
  notes: PropTypes.array,
  initNotes: PropTypes.array,
  focusIndex: PropTypes.number,
  ongoingSaves: PropTypes.number.isRequired,
  saved: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  notesLoaded: PropTypes.bool.isRequired,
  setId: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  removeNote: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  addNote: PropTypes.func,
  switchChecked: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  setFocus: PropTypes.func.isRequired,
  moveNote: PropTypes.func.isRequired,
  editNote: PropTypes.func,
  setNotes: PropTypes.func,
  save: PropTypes.func,
  setError: PropTypes.func,
  undo: PropTypes.func,
  hasHistory: PropTypes.bool,
};

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    if (this.props.focusIndex === this.props.index) {
      this.textInput.focus();
      this.props.setFocus(-1);
    }
    if (this.props.lastNote && this.props.focusIndex === -1) {
      this.textInput.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.focusIndex === this.props.index) {
      this.textInput.focus();
      this.props.setFocus(-1);
    }
  }

  onCheck() {
    this.props.switchChecked();
    this.props.moveNote();
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.addNote();
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 8 && this.props.text === '') {
      // backspace
      e.preventDefault();
      this.props.delete();
      this.props.setFocus(this.props.index - 1);
    }
  }

  render() {
    const inputClass = classNames({
      'standard-input': true,
      crossed: this.props.checked,
    });
    return (
      <div className="note">
        <CheckBox checked={this.props.checked} checkCb={this.onCheck} />
        <input
          className={inputClass}
          value={this.props.text}
          onChange={e => this.props.editNote(e.target.value)}
          onKeyPress={e => this.onKeyPress(e)}
          onKeyDown={e => this.onKeyDown(e)}
          ref={(input) => {
            this.textInput = input;
          }}
        />
        <button
          className="normalize-button standard-button delete-button"
          onClick={this.props.delete}
        >
          delete
        </button>
      </div>
    );
  }
}
Note.propTypes = {
  text: PropTypes.string,
  checked: PropTypes.bool,
  index: PropTypes.number,
  lastNote: PropTypes.bool,
  focusIndex: PropTypes.number,
  addNote: PropTypes.func,
  delete: PropTypes.func,
  switchChecked: PropTypes.func,
  setFocus: PropTypes.func,
  moveNote: PropTypes.func.isRequired,
  editNote: PropTypes.func,
};

export default connect(
  state => ({
    notes: state.noteReducer.notes,
    focusIndex: state.noteReducer.focusIndex,
    ongoingSaves: state.noteReducer.ongoingSaves,
    saved: state.noteReducer.saved,
    error: state.noteReducer.error,
    notesLoaded: state.noteReducer.notesLoaded,
    hasHistory: state.noteReducer.history.length > 0,
  }),
  {
    setId,
    addNote,
    removeNote,
    switchChecked,
    setFocus,
    moveNote,
    editNote,
    setNotes,
    save,
    setError,
    undo,
  },
)(Main);
