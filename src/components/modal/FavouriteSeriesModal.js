// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import Checkbox from '../Checkbox';
import series from '../../data/season.json';

import styles from '../../styles/main.module.scss';

const groupedSeries = series.reduce((grouped, single) => {
  if (single.catid === 1) {
    return {
      ...grouped,
      oval: [
        ...grouped.oval,
        single,
      ],
    };
  }
  if (single.catid === 3) {
    return {
      ...grouped,
      dirtOval: [
        ...grouped.dirtOval,
        single,
      ],
    };
  }
  if (single.catid === 4) {
    return {
      ...grouped,
      rx: [
        ...grouped.rx,
        single,
      ],
    };
  }
  return {
    ...grouped,
    road: [
      ...grouped.road,
      single,
    ],
  };
}, { oval: [], road: [], dirtOval: [], rx: [] });

type Props = {
  onClose?: () => void,
  isOpen?: boolean,
  favouriteSeries?: Array<number>,
  save?: (Array<number>) => void,
};

const defaultProps = {
  onClose: () => {},
  isOpen: false,
  save: () => {},
  favouriteSeries: [],
};

export default function FavouriteSeriesModal({ onClose, isOpen, favouriteSeries, save }: Props) {
  const { t } = useTranslation();

  const setCheckboxFavourite = (seriesId, newValue) => {
    const newFavorites = [...favouriteSeries];
    const index = newFavorites.indexOf(seriesId);

    if (index === -1 && newValue) {
      newFavorites.push(seriesId);
    }
    if (index !== -1 && newValue === false) {
      newFavorites.splice(index, 1);
    }
    save(newFavorites);
  };

  const renderCheckboxes = (cbSeries) => (
    <div className={styles['col-md-6']} key={cbSeries.seriesid}>
      <Checkbox
        id={`favourite-series-${cbSeries.seriesid}`}
        checked={favouriteSeries.indexOf(cbSeries.seriesid) !== -1}
        onChange={(newValue) => {
          setCheckboxFavourite(cbSeries.seriesid, newValue);
        }}
      >
        {t(cbSeries.seriesname)}
      </Checkbox>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('Choose favorite series')} doneAction={onClose}>
      <div className={styles['container-fluid']}>
        <h3>{t('Oval')}</h3>
        <div className={styles.row}>
          {groupedSeries.oval.map(renderCheckboxes)}
        </div>
        <h3>{t('Road')}</h3>
        <div className={styles.row}>
          {groupedSeries.road.map(renderCheckboxes)}
        </div>
        <h3>{t('Dirt Oval')}</h3>
        <div className={styles.row}>
          {groupedSeries.dirtOval.map(renderCheckboxes)}
        </div>
        <h3>{t('RX')}</h3>
        <div className={styles.row}>
          {groupedSeries.rx.map(renderCheckboxes)}
        </div>
      </div>
    </Modal>
  );
}

FavouriteSeriesModal.defaultProps = defaultProps;
