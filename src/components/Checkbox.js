// @flow

import * as React from 'react';
import classnames from 'classnames';

type Props = {
  onChange: (newValue: boolean) => void,
  checked: boolean,
  disabled: boolean,
  children?: React.Node,
};

export default function Checkbox({ onChange, checked, disabled, children }: Props): React.Node {
  return (
    <div className={classnames({ checkbox: true, disabled })}>
      <label>
        <input type='checkbox' onChange={(e) => (onChange(e.target.checked))} checked={checked} disabled={disabled} />
        {children}
      </label>
    </div>
  );
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {}
};
