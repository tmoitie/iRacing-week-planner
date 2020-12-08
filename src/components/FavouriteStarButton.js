// @flow

import * as React from 'react';
import classnames from 'classnames';

import styles from '../styles/main.module.scss';

type Props = {
  onClick?: (newValue: boolean) => void,
  enabled?: boolean,
};

export default function FavouriteStarButton({ enabled, onClick }: Props): React.Node {
  return (
    <span
      onClick={() => onClick(!enabled)}
      className={classnames({
        [styles.glyphicon]: true,
        [styles['glyphicon-star']]: enabled,
        [styles['glyphicon-star-empty']]: !enabled
      })}
    />
  );
}

FavouriteStarButton.defaultProps = {
  enabled: false,
  onClick: () => {},
};
