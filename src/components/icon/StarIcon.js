// @flow

import React from 'react';
import styles from '../../styles/main.module.scss';

export default function StarIcon() {
  return <span data-testid="StarIcon" className={`${styles.glyphicon} ${styles['glyphicon-star']}`} />;
}
