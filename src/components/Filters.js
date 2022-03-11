// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import type { FilterOptions as filtersType } from '../reducers/settings';
import { resetFilters, resetSettings, updateFilters } from '../actions/settings';
import Checkbox from './Checkbox';

import styles from '../styles/main.module.scss';

const currentFiltersSelector = (state) => state.settings.filters;
const userSelector = (state) => state.auth.user;
const firebaseSyncedSelector = (state) => state.settings.firebaseSynced;

export default function Filters(): React.Node {
  const currentFilters: filtersType = useSelector(currentFiltersSelector, shallowEqual);
  const user = useSelector(userSelector, shallowEqual);
  const firebaseSynced = useSelector(firebaseSyncedSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getCheckboxFilterHandler = (key: string, value: any) => (
    (newValue: boolean): void => {
      const newFilters = { ...currentFilters };

      const index = newFilters[key].indexOf(value);

      if (index === -1 && newValue) {
        newFilters[key] = [...newFilters[key], value];
      }
      if (index !== -1 && newValue === false) {
        newFilters[key] = newFilters[key].filter((_, i) => i !== index);
      }
      dispatch(updateFilters(newFilters));
    }
  );

  const getBooleanFilterHandler = (key: string) => (
    (newValue: boolean): void => {
      dispatch(updateFilters({
        ...currentFilters,
        [key]: newValue,
      }));
    }
  );

  return (
    <div style={{ fontSize: '0.8em' }}>
      <h4>{t('Type')}</h4>
      <Checkbox
        id="checkbox-type-oval"
        checked={currentFilters.type.indexOf('Oval') !== -1}
        onChange={getCheckboxFilterHandler('type', 'Oval')}
      >
        {t('Oval')}
      </Checkbox>
      <Checkbox
        id="checkbox-type-road"
        checked={currentFilters.type.indexOf('Road') !== -1}
        onChange={getCheckboxFilterHandler('type', 'Road')}
      >
        {t('Road')}
      </Checkbox>
      <Checkbox
        id="checkbox-type-dirt"
        checked={currentFilters.type.indexOf('Dirt') !== -1}
        onChange={getCheckboxFilterHandler('type', 'Dirt')}
      >
        {t('Dirt')}
      </Checkbox>
      <Checkbox
        id="checkbox-type-rx"
        checked={currentFilters.type.indexOf('RX') !== -1}
        onChange={getCheckboxFilterHandler('type', 'RX')}
      >
        {t('RX')}
      </Checkbox>

      <h4>{t('Licence')}</h4>
      <Checkbox
        id="checkbox-licence-r"
        checked={currentFilters.licence.indexOf('R') !== -1}
        onChange={getCheckboxFilterHandler('licence', 'R')}
      >
        {t('R')}
      </Checkbox>
      <Checkbox
        id="checkbox-licence-d"
        checked={currentFilters.licence.indexOf('D') !== -1}
        onChange={getCheckboxFilterHandler('licence', 'D')}
      >
        {t('D')}
      </Checkbox>
      <Checkbox
        id="checkbox-licence-c"
        checked={currentFilters.licence.indexOf('C') !== -1}
        onChange={getCheckboxFilterHandler('licence', 'C')}
      >
        {t('C')}
      </Checkbox>
      <Checkbox
        id="checkbox-licence-b"
        checked={currentFilters.licence.indexOf('B') !== -1}
        onChange={getCheckboxFilterHandler('licence', 'B')}
      >
        {t('B')}
      </Checkbox>
      <Checkbox
        id="checkbox-licence-a"
        checked={currentFilters.licence.indexOf('A') !== -1}
        onChange={getCheckboxFilterHandler('licence', 'A')}
      >
        {t('A')}
      </Checkbox>
      <Checkbox
        id="checkbox-licence-p"
        checked={currentFilters.licence.indexOf('P') !== -1}
        onChange={getCheckboxFilterHandler('licence', 'P')}
      >
        {t('P')}
      </Checkbox>

      <h4>{t('Official/Fixed')}</h4>
      <Checkbox
        id="checkbox-official-false"
        checked={currentFilters.official.indexOf(false) !== -1}
        onChange={getCheckboxFilterHandler('official', false)}
      >
        {t('Unofficial')}
      </Checkbox>
      <Checkbox
        id="checkbox-official-true"
        checked={currentFilters.official.indexOf(true) !== -1}
        onChange={getCheckboxFilterHandler('official', true)}
      >
        {t('Official')}
      </Checkbox>
      <Checkbox
        id="checkbox-fixed-false"
        checked={currentFilters.fixed.indexOf(false) !== -1}
        onChange={getCheckboxFilterHandler('fixed', false)}
      >
        {t('Open setup')}
      </Checkbox>
      <Checkbox
        id="checkbox-fixed-true"
        checked={currentFilters.fixed.indexOf(true) !== -1}
        onChange={getCheckboxFilterHandler('fixed', true)}
      >
        {t('Fixed setup')}
      </Checkbox>

      <h4>{t('Content')}</h4>
      <Checkbox
        id="checkbox-ownedCars"
        checked={currentFilters.ownedCars === true}
        onChange={getBooleanFilterHandler('ownedCars')}
      >
        {t('Owned cars only')}
      </Checkbox>
      <Checkbox
        id="checkbox-ownedTracks"
        checked={currentFilters.ownedTracks === true}
        onChange={getBooleanFilterHandler('ownedTracks')}
      >
        {t('Owned tracks only')}
      </Checkbox>
      <Checkbox
        id="checkbox-favouriteSeries"
        checked={currentFilters.favouriteSeries === true}
        onChange={getBooleanFilterHandler('favouriteSeries')}
      >
        {t('Favorite series only')}
      </Checkbox>
      <Checkbox
        id="checkbox-favouriteCarsOnly"
        checked={currentFilters.favouriteCarsOnly === true}
        onChange={getBooleanFilterHandler('favouriteCarsOnly')}
      >
        {t('Favorite cars only')}
      </Checkbox>
      <Checkbox
        id="checkbox-favouriteTracksOnly"
        checked={currentFilters.favouriteTracksOnly === true}
        onChange={getBooleanFilterHandler('favouriteTracksOnly')}
      >
        {t('Favorite tracks only')}
      </Checkbox>

      <p>
        <button
          id="filters-reset-filters-button"
          type="button"
          className={`${styles.btn} ${styles['btn-primary']}`}
          onClick={() => dispatch(resetFilters())}
        >
          {t('Reset filters')}
        </button>
      </p>

      <p>
        <button
          id="filters-reset-settings-button"
          type="button"
          className={`${styles.btn} ${styles['btn-primary']}`}
          onClick={() => dispatch(resetSettings())}
        >
          {t('Reset all settings')}
        </button>
      </p>

      {user ? (
        <p>
          <span
            id="filters-synced-status"
          >
            {firebaseSynced ? t('Synced') : t('Awaiting sync')}
            {t('(refresh browser to download latest)')}
          </span>
        </p>
      ) : null}
    </div>
  );
}
