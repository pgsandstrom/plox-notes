import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import './main.scss';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onChange(e) {
    this.setState({ id: e.target.value });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const path = `/${id}`;
      browserHistory.push(path);
    }
  }

  render() {
    return (
      <div className="react-root">
        <div className="main-body">
          <div>Pls give the ID to your note (it will be public)</div>
          <div>
            <input className="standard-input" value={this.state.id} onChange={this.onChange} onKeyPress={this.onKeyPress} />
          </div>
          <div>
            <button onClick={() => this.props.goto(this.state.id)}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}
Welcome.propTypes = {
  goto: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
};

export default Welcome;
