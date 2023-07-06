// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';

import mainStyles from '../styles/main.module.scss';
import styles from './styles/coachDave.module.scss';

import '@blueprintjs/core/lib/css/blueprint.css';

export default function CoachDaveSponsor(): React.Node {
  const { t } = useTranslation();
  const clickSponsor = () => {
    window.dataLayer.push({
      event: 'event',
      eventProps: {
        category: 'Sponsor button',
        action: 'click',
        label: 'Coach Dave',
      },
    });
  };

  return (
    <div className={styles.sponsoredContainer}>
      <a
        onClick={clickSponsor}
        href="https://coachdaveacademy.com/product-category/iracing-setups/?ref=iracing-week-planner.tmo.lol"
        rel="sponsored"
        className={styles.sponsoredLink}
      >
        <h4 className={styles.sponsoredHeader}>
          {t('Sponsored')}
        </h4>
        <h3 className={styles.sponsoredTitle}>
          {t('Looking for iRacing Setups?')}
        </h3>
        <p className={styles.sponsoredBody}>
          {t('Grab a setup from Coach Dave Academy, developed by professional sim racers and engineers.')}
        </p>
        <p
          className={`${mainStyles.btn} ${mainStyles['btn-primary']} ${styles.button}`}
        >
          {t('Browse Setups')}
        </p>
      </a>
    </div>
  );
}
