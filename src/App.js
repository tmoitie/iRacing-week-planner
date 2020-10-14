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

import styles from './styles/main.scss';

export default function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(startListener());
  }, []);

  return (
    <div>
      <Navbar />
      <GlobalModals />
      <div className={styles['container-fluid']}>
        <div className={styles.row}>
          <div className={styles['col-md-2']}>
            <div>
              <BuyACoffee />
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
