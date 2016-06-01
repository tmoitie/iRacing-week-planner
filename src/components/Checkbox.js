import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function Checkbox({ onChange, checked, disabled, children }) {
  return (
    <div className={classnames({ checkbox: true, disabled })}>
      <label>
        <input type='checkbox' onChange={onChange} checked={checked} disabled={disabled} />
        {children}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {}
};
