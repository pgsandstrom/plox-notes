import React from 'react';
import PropTypes from 'prop-types';

import './widgets.scss';
import '../css/_util.scss';

// eslint-disable-next-line import/prefer-default-export
export const CheckBox = props => (
  <button
    onClick={props.checkCb}
    className={`${props.className || ''} normalize-button default-checkbox`}
    disabled={props.disabled}
  >
    <i className={props.checked ? 'fa fa-check-square-o' : 'fa fa-square-o'} />
    <span>{props.text}</span>
  </button>
);
CheckBox.propTypes = {
  checkCb: PropTypes.func,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
};
