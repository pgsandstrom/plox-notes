import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addNote, removeNote, switchChecked, editNote, load, save } from './actions';
import { CheckBox } from './widgets';

import './main.scss';

class Main extends React.Component {
  componentWillMount() {
    this.props.load(this.props.params.noteid);
  }

  render() {
    return (
      <div className="react-root">
        <div className="main">
          <div className="title">{this.props.params.noteid}</div>
          <div className="notes">
            {this.props.notes.map((note, index) =>
              <Note
                key={index}
                text={note.text}
                checked={note.checked}
                index={index}
                lastNote={index === this.props.notes.length - 1}
                newNoteIndex={this.props.newNoteIndex}
                switchChecked={() => this.props.switchChecked(index)}
                addNote={() => this.props.addNote(index + 1)}
                delete={() => this.props.removeNote(index)}
                editNote={text => this.props.editNote(index, text)}
              />)}
          </div>
          <div className="bottom">
            <button className="normalize-button standard-button button-add" onClick={() => this.props.addNote(this.props.notes.length)}>Add</button>
            <button className="normalize-button standard-button button-save" onClick={() => this.props.save(this.props.params.noteid, this.props.notes)}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  params: PropTypes.object,
  notes: PropTypes.array,
  newNoteIndex: PropTypes.number,
  removeNote: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  addNote: PropTypes.func,
  switchChecked: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  editNote: PropTypes.func,
  load: PropTypes.func,
  save: PropTypes.func,
};

const onEnter = (e, func) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    func();
  }
};

class Note extends React.Component {
  componentDidMount() {
    if (this.props.newNoteIndex === this.props.index) {
      this.textInput.focus();
    }
    if (this.props.lastNote) {
      this.textInput.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.newNoteIndex === this.props.index) {
      this.textInput.focus();
    }
  }

  render() {
    return (
      <div className="note">
        <CheckBox checked={this.props.checked} checkCb={this.props.switchChecked} />
        <input
          className="standard-input"
          value={this.props.text}
          onChange={e => this.props.editNote(e.target.value)}
          onKeyPress={e => onEnter(e, this.props.addNote)}
          ref={(input) => { this.textInput = input; }}
        />
        <button className="normalize-button standard-button delete-button" onClick={this.props.delete}>delete</button>
      </div>
    );
  }
}
Note.propTypes = {
  text: PropTypes.string,
  checked: PropTypes.bool,
  index: PropTypes.number,
  lastNote: PropTypes.number,
  newNoteIndex: PropTypes.number,
  addNote: PropTypes.func,
  delete: PropTypes.func,
  switchChecked: PropTypes.func,
  editNote: PropTypes.func,
};

export default connect(state => ({
  notes: state.noteReducer.notes,
  newNoteIndex: state.noteReducer.newNoteIndex,
}),
  {
    addNote,
    removeNote,
    switchChecked,
    editNote,
    load,
    save,
  })(Main);
