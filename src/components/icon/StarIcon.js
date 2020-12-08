// @flow

import React from 'react';
import styles from '../../styles/main.module.scss';

type Props = {

};

export default function StarIcon() {
  return <span className={`${styles.glyphicon} ${styles['glyphicon-star']}`} />;
}
