// @flow

import * as React from 'react';
import classnames from 'classnames';

import styles from '../styles/main.module.scss';

type Props = {
  id: string,
  onChange?: (newValue: boolean) => void,
  checked?: boolean,
  disabled?: boolean,
  children?: React.Node,
};

export default function Checkbox({
  id,
  onChange = () => {},
  checked = false,
  disabled = false,
  children = null,
}: Props): React.Node {
  return (
    <div data-testid={id} className={classnames({ [styles.checkbox]: true, [styles.disabled]: disabled })}>
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
