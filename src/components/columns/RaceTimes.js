// @flow

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Modal from '../modal/Modal';
import styles from './columns.scss';

type Props = {
  race: {
    series: string,
    raceTimes?: {
      setTimes?: Array<moment.Duration>,
      everyTime?: moment.Duration,
      offset?: moment.Duration,
    },
  },
};

console.log(styles);

export default function NextRace({ race }: Props) {
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
      <td className={styles.clickableCell}>
        <button type="button" className={styles.cellButton} onClick={openModal} onKeyPress={openModal}>
          {t('Set Times')}
        </button>
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={t('Set times for {{series}}', { series: t(race.series) })}
          doneAction={closeModal}
        >
          <div className="container-fluid">
            <ul>
              {race.raceTimes.setTimes.map(
                (time) => (
                  <li key={time}>
                    {t('{{timeLocal, ddd h:mma}} ({{timeUtc, ddd h:mma z}})', {
                      timeLocal: moment(weekStart).add(time).local().toDate(),
                      timeUtc: moment(weekStart).add(time).utc().toDate(),
                    })}
                  </li>
                ),
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
            time: moment().utc().startOf('day').add(race.raceTimes.offset)
              .toDate(),
          })}
        </div>
      </td>
    );
  }

  return <td>{t('No time data')}</td>;
}
