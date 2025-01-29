// @flow

import axios from 'axios';
import * as React from 'react';

import { useTranslation } from 'react-i18next';
import styles from './styles/buyACoffee.module.css';

export default function BuyACoffee(): React.Node {
  const { t, i18n } = useTranslation();

  const clickBuyCoffee = () => {
    window.dataLayer.push({
      event: 'select_content',
      contentType: 'sponsor',
      contentID: 'Buy A Coffee',
    });

    window.location.assign('https://www.buymeacoffee.com/tmoitie');
  };

  return (
    <button type="button" className={styles.bmcButton} onClick={clickBuyCoffee} onKeyPress={clickBuyCoffee}>
      <img
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt={t('Buy me a coffee')}
      />
      <span style={{ marginLeft: '5px' }}>
        {t('Buy me a coffee')}
      </span>
    </button>
  );
}
