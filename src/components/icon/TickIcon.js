import React from 'react';
import styles from '../../styles/main.module.scss';

export default function TickIcon() {
  return <span data-testid="TickIcon" className={`${styles.glyphicon} ${styles['glyphicon-ok']}`} />;
}
