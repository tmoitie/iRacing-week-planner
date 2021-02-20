// @flow

import classnames from 'classnames';
import * as React from 'react';
import styles from './styles/columns.module.scss';

type Props = {
  className?: string,
  onClick: () => void,
  children: React.Node,
};

export default function ClickableCell({ className = '', onClick, children }: Props) {
  const [height, setHeight] = React.useState(0);
  const tdRef = React.useRef(null);

  React.useLayoutEffect(() => {
    setHeight(tdRef.current.clientHeight);
  }, [tdRef]);

  return (
    <td className={classnames(className, styles.clickableCell)} ref={tdRef}>
      <button
        type="button"
        className={styles.cellButton}
        onClick={onClick}
        onKeyPress={onClick}
        style={{ minHeight: height }}
      >
        {children}
      </button>
    </td>
  );
}
