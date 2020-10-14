// @flow

import * as React from 'react';
import classnames from 'classnames';

import styles from '../styles/main.scss';

type Props = {
  id: string,
  onChange?: (newValue: boolean) => void,
  checked?: boolean,
  disabled?: boolean,
  children?: React.Node,
};

export default function Checkbox({ id, onChange, checked, disabled, children }: Props): React.Node {
  return (
    <div className={classnames({ [styles.checkbox]: true, [styles.disabled]: disabled })}>
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          onChange={(e) => (onChange(e.target.checked))}
          checked={checked}
          disabled={disabled}
        />
        {children}
      </label>
    </div>
  );
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {},
  children: null,
};
