import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Modal from '../modal/Modal';
import moment from 'moment';

export default function NextRace({ race }) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { t } = useTranslation();

  if (race.raceTimes === null) {
    return <td>{t('No time data')}</td>;
  }

  if (race.raceTimes.setTimes) {
    const weekStart = moment().utc().startOf('week').add(2, 'days');

    return (
      <td onClick={openModal} className='clickable-cell'>
        {t('Set Times')}

        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={t('Set times for {{series}}', { series: t(race.series) })}
          doneAction={closeModal}
        >
          <div className='container-fluid'>
            <ul>
              {race.raceTimes.setTimes.map(
                (time) => (
                  <li key={time}>
                    {t('{{timeLocal, ddd h:mma}} ({{timeUtc, ddd h:mma z}})', {
                      timeLocal: moment(weekStart).add(time).local().toDate(),
                      timeUtc: moment(weekStart).add(time).utc().toDate(),
                    })}
                  </li>
                )
              )}
            </ul>
          </div>
        </Modal>
      </td>
    );
  }

  if (race.raceTimes.everyTime) {
    return (
      <td>
        <div>
          {t('Every {{every}} starting at {{time, H:mm}} UTC', {
            every: race.raceTimes.everyTime.humanize().replace(/an?\s/, ''),
            time: moment().utc().startOf('day').add(race.raceTimes.offset).toDate(),
          })}
        </div>
      </td>
    );
  }

  return <td>{t('No time data')}</td>;
}

NextRace.propTypes = {
  race: PropTypes.object.isRequired,
};
