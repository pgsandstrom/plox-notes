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
                switchChecked={() => this.props.switchChecked(index)}
                addNote={this.props.addNote}
                delete={() => this.props.removeNote(index)}
                editNote={text => this.props.editNote(index, text)}
              />)}
          </div>
          <div className="bottom">
            <button className="normalize-button standard-button button-add" onClick={this.props.addNote}>Add</button>
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

const Note = props => (
  <div className="note">
    <CheckBox checked={props.checked} checkCb={props.switchChecked} />
    <input className="standard-input" value={props.text} onChange={e => props.editNote(e.target.value)} onKeyPress={e => onEnter(e, props.addNote)} />
    <button className="normalize-button standard-button delete-button" onClick={props.delete}>delete</button>
  </div>
);
Note.propTypes = {
  text: PropTypes.string,
  checked: PropTypes.bool,
  addNote: PropTypes.func,
  delete: PropTypes.func,
  switchChecked: PropTypes.func,
  editNote: PropTypes.func,
};

export default connect(state => ({
  notes: state.noteReducer.notes,
}),
  {
    addNote,
    removeNote,
    switchChecked,
    editNote,
    load,
    save,
  })(Main);
