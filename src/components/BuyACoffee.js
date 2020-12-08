// @flow

import * as React from 'react';

import { useTranslation } from 'react-i18next';
import styles from './styles/buyACoffee.module.css';

export default function BuyACoffee(): React.Node {
  const { t } = useTranslation();
  return (
    <a className={styles.bmcButton} target="_blank" rel="noreferrer" href="https://www.buymeacoffee.com/tmoitie">
      <img
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt={t('Buy me a coffee')}
      />
      <span style={{ marginLeft: '5px' }}>
        {t('Buy me a coffee')}
      </span>
    </a>
  );
}
