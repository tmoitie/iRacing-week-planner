import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import moment from 'moment';
import classnames from 'classnames';

import allRaces from '../../lib/races';

const now = moment().utc();

export default function SeriesModal( { onClose, ownedTracks, isOpen, seriesId }) {
  const races = allRaces.filter(race => race.seriesId === seriesId);
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('Tracks for {{series}}', {
        series: t(races[0].series),
      })}
      doneAction={onClose}
    >
      <div className='container-fluid'>
        <div className='table-responsive'>
          <table className='table' style={{ fontSize: '0.8em' }}>
            <thead>
              <tr>
                <th>{t('Week')}</th>
                <th>{t('Track')}</th>
                <th>{t('Start')}</th>
                <th>{t('End')}</th>
              </tr>
            </thead>
            <tbody>
              {races.map((race) => {
                const raceWeekEnd = moment(race.startTime).add(race.weekLength);
                const current = now.isBetween(race.startTime, raceWeekEnd);

                const startDate = moment(race.startTime).local().toDate();
                const endDate = moment(race.startTime).local().add(race.weekLength)
                  .subtract(1, 'days').toDate();

                return (
                  <tr key={race.week} style={current ? { fontWeight: 700 } : {}}>
                    <td>
                      {race.week + 1}
                    </td>
                    <td className={classnames({ success: ownedTracks.indexOf(race.trackId) !== -1 })}>
                      {t(race.track)}
                    </td>
                    <td>
                      {t('{{date, YYYY-MM-DD}}', { date: startDate })}
                    </td>
                    <td>
                      {t('{{date, YYYY-MM-DD}}', { date: endDate })}
                    </td>
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

SeriesModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  seriesId: PropTypes.number.isRequired,
  ownedTracks: PropTypes.array,
}

SeriesModal.defaultProps = {
  onClose: () => {},
  isOpen: false,
  ownedTracks: [],
}
