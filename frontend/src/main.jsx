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
        <div className="main-body">
          <div>{this.props.params.noteid}</div>
          <div>Skriv saker:</div>
          {this.props.notes.map((note, index) =>
            <Note
              key={index}
              text={note.text}
              checked={note.checked}
              switchChecked={() => this.props.switchChecked(index)}
              delete={() => this.props.removeNote(index)}
              editNote={text => this.props.editNote(index, text)}
            />)}
          <button onClick={this.props.addNote}>add</button>
          <br />
          <button onClick={() => this.props.save(this.props.params.noteid, this.props.notes)}>Save</button>
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

const Note = props => (
  <div>
    <CheckBox checked={props.checked} checkCb={props.switchChecked} />
    <input className="standard-input" value={props.text} onChange={e => props.editNote(e.target.value)} />
    <button onClick={props.delete}>delete</button>
  </div>
);
Note.propTypes = {
  text: PropTypes.string,
  checked: PropTypes.bool,
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
