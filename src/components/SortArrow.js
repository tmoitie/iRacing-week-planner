// @flow

import * as React from 'react';

import type { sort as sortType } from '../reducers/settings';

import styles from '../styles/main.scss';

type Props = {
  sort: sortType,
};

export default function SortArrow({ sort }: Props): React.Node {
  if (sort.order === 'desc') {
    return <span className={`${styles.glyphicon} ${styles['glyphicon-triangle-bottom']}`} />;
  }

  return <span className={`${styles.glyphicon} ${styles['glyphicon-triangle-top']}`} />;
}
