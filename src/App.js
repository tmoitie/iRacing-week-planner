// @flow

import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BuyACoffee from './components/BuyACoffee';
import DateSlider from './components/DateSlider';
import GlobalModals from './components/GlobalModals';
import Navbar from './components/Navbar';

import { startListener } from './actions/auth';

import RaceListing from './components/RaceListing';
import Filters from './components/Filters';

import styles from './styles/main.module.scss';

import '@blueprintjs/core/lib/css/blueprint.css';
import CoachDaveSponsor from './components/CoachDaveSponsor';

import './styles/fonts.css';

export default function App(): React.Node {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(startListener());

    return () => {};
  }, []);

  React.useEffect(() => {
    document.body.dir = i18n.dir();
    document.documentElement.setAttribute('lang', i18n.language);

    return () => {};
  }, [i18n.language]);

  return (
    <div>
      <Navbar />
      <GlobalModals />
      <div className={styles['container-fluid']}>
        <div className={styles.row}>
          <div className={styles['col-md-2']}>
            <div>
              <BuyACoffee />
              <CoachDaveSponsor />
            </div>
            <h3>{t('Filters')}</h3>
            <Filters />
          </div>
          <div className={styles['col-md-10']}>
            <DateSlider />
            <RaceListing />
          </div>
        </div>
      </div>
    </div>
  );
}
