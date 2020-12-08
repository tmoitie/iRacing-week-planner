import React from 'react';
import styles from '../../styles/main.module.scss';

export default function ShoppingCartIcon() {
  return <span className={`${styles.glyphicon} ${styles['glyphicon-shopping-cart']}`} />;
}
