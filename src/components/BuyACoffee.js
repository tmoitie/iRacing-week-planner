import './styles/buyACoffee.css';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function BuyACoffee() {
  const { t } = useTranslation();
  return (
    <a className="bmc-button" target="_blank" href="https://www.buymeacoffee.com/tmoitie">
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
