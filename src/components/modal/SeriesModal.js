// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import classnames from 'classnames';
import Modal from './Modal';
import RaceLength from '../columns/RaceLength';

import allRaces from '../../lib/races';

import styles from '../../styles/main.module.scss';

type Props = {
  onClose: () => void,
  isOpen: boolean,
  ownedTracks: Array<number>,
  seriesId: number,
};

export default function SeriesModal({ onClose, ownedTracks, isOpen, seriesId }: Props) {
  const races = allRaces.filter((race) => race.seriesId === seriesId);
  const { t } = useTranslation();

  const now = moment().utc();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('Tracks for {{series}}', {
        series: t(races[0].series),
      })}
      doneAction={onClose}
    >
      <div className={styles['container-fluid']}>
        <div className={styles['table-responsive']}>
          <table className={styles.table} style={{ fontSize: '0.8em' }}>
            <thead>
              <tr>
                <th>{t('Week')}</th>
                <th>{t('Track')}</th>
                <th>{t('Start')}</th>
                <th>{t('End')}</th>
                <th>{t('Length')}</th>
              </tr>
            </thead>
            <tbody>
              {races.map((race) => {
                const raceWeekEnd = moment(race.startTime).add(race.weekLength);
                const current = now.isBetween(race.startTime, raceWeekEnd);

                const startDate = moment(race.startTime).local().toDate();
                const endDate = moment(race.startTime).local().add(race.weekLength)
                  .subtract(1, 'days')
                  .toDate();

                return (
                  <tr key={race.week} style={current ? { fontWeight: 700 } : {}}>
                    <td>
                      {race.week + 1}
                    </td>
                    <td className={classnames({ [styles.success]: ownedTracks.indexOf(race.trackId) !== -1 })}>
                      {t(race.track)}
                    </td>
                    <td>
                      {t('{{date, YYYY-MM-DD}}', { date: startDate })}
                    </td>
                    <td>
                      {t('{{date, YYYY-MM-DD}}', { date: endDate })}
                    </td>
                    <RaceLength race={race} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
