// @flow

import { Slider } from '@blueprintjs/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateDays } from '../actions/app';

import { seasonStart, seasonEnd } from '../config';
import styles from '../styles/main.module.scss';

const seasonLengthDays = seasonEnd.diff(seasonStart, 'days');

const dateDaysSelector = (state) => state.app.daysSinceSeasonStart;
const dateSelector = (state) => state.app.date;
const weekSelector = (state) => state.app.week;

export default function DateSlider() {
  const { t } = useTranslation();
  const dateDays = useSelector(dateDaysSelector);
  const date = useSelector(dateSelector, shallowEqual);
  const week = useSelector(weekSelector);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.row}>
        <h3 className={styles['col-xs-8']}>
          {t('Races for date: {{date, YYYY MMM DD}}', { date: date.local().toDate() })}
        </h3>
        <h3 className={styles['col-xs-4']} style={{ textAlign: 'right' }}>
          {t('Week {{week}}', { week })}
        </h3>
      </div>
      <div style={{ marginBottom: 10 }}>
        <Slider
          min={0}
          max={seasonLengthDays}
          value={dateDays}
          stepSize={1}
          onChange={(days) => dispatch(updateDays(days))}
          labelRenderer={false}
        />
      </div>
    </>
  );
}
