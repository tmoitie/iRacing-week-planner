// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import Checkbox from '../Checkbox';
import series from '../../data/season.json';

import styles from '../../styles/main.module.scss';

const groupedSeries = (filteredSeries) => filteredSeries.reduce((grouped, single) => {
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
  if (single.catid === 5) {
    return {
      ...grouped,
      sportsCar: [
        ...grouped.sportsCar,
        single,
      ],
    };
  }
  return {
    ...grouped,
    formulaCar: [
      ...grouped.formulaCar,
      single,
    ],
  };
}, { oval: [], road: [], dirtOval: [], rx: [], sportsCar: [], formulaCar: [] });

type Props = {
  onClose: () => void,
  isOpen?: boolean,
  favouriteSeries?: Array<number>,
  save: (Array<number>) => void,
};

export default function FavouriteSeriesModal({ onClose, isOpen = false, favouriteSeries = [], save }: Props) {
  const [searchInput, setSearchInput] = React.useState('');
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

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const getFilteredSeries = () => {
    if (searchInput.length > 0) {
      return series.filter((serie) => serie.seriesname.toUpperCase().includes(searchInput.toUpperCase()));
    }
    return series;
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
    <Modal
      id="favouriteSeriesModal"
      isOpen={isOpen}
      onClose={onClose}
      title={t('Choose favorite series')}
      doneAction={onClose}
    >
      <div className={styles['form-group']}>
        <input
          type="text"
          className={styles['form-control']}
          placeholder={t('Search series')}
          aria-label="search series"
          onChange={handleChange}
          value={searchInput}
        />
      </div>
      <div className={styles['container-fluid']}>
        {groupedSeries(getFilteredSeries()).oval.length > 0 && (
          <>
            <h3>{t('Oval')}</h3>
            <div className={styles.row}>
              {groupedSeries(getFilteredSeries()).oval.map(renderCheckboxes)}
            </div>
          </>
        )}
        {groupedSeries(getFilteredSeries()).sportsCar.length > 0 && (
          <>
            <h3>{t('Sports Car')}</h3>
            <div className={styles.row}>
              {groupedSeries(getFilteredSeries()).sportsCar.map(renderCheckboxes)}
            </div>
          </>
        )}
        {groupedSeries(getFilteredSeries()).formulaCar.length > 0 && (
          <>
            <h3>{t('Formula Car')}</h3>
            <div className={styles.row}>
              {groupedSeries(getFilteredSeries()).formulaCar.map(renderCheckboxes)}
            </div>
          </>
        )}
        {groupedSeries(getFilteredSeries()).dirtOval.length > 0 && (
          <>
            <h3>{t('Dirt Oval')}</h3>
            <div className={styles.row}>
              {groupedSeries(getFilteredSeries()).dirtOval.map(renderCheckboxes)}
            </div>
          </>
        )}
        {groupedSeries(getFilteredSeries()).rx.length > 0 && (
          <>
            <h3>{t('RX')}</h3>
            <div className={styles.row}>
              {groupedSeries(getFilteredSeries()).rx.map(renderCheckboxes)}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
