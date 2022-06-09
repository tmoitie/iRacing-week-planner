// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import type { TimeableRace } from '../../lib/races';
import Modal from '../modal/Modal';
import ClickableCell from './ClickableCell';

import bootstrapStyles from '../../styles/main.module.scss';

type Props = {
  race: {
    ...TimeableRace,
    series: string,
  },
};

export default function RaceTimes({ race }: Props): React.Node {
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { t } = useTranslation();

  if (race.setTimes) {
    const weekStart = moment(moment().utc()).subtract(1, 'days').startOf('isoWeek').add(1, 'days');

    return (
      <>
        <ClickableCell onClick={openModal}>
          {t('Set times')}
        </ClickableCell>
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={t('Set times for {{series}}', { series: t(race.series) })}
          doneAction={closeModal}
        >
          <div className={bootstrapStyles['container-fluid']}>
            <ul>
              {race.setTimes.map(
                (time) => (
                  <li key={time.toString()}>
                    {t('{{timeLocal, datetime}} ({{timeUtc, datetime}})', {
                      timeLocal: moment(weekStart).add(time).toDate(),
                      timeUtc: moment(weekStart).add(time).toDate(),
                      formatParams: {
                        timeLocal: {
                          weekday: 'long',
                          hour: 'numeric',
                          minute: 'numeric',
                          timeZoneName: 'short',
                        },
                        timeUtc: {
                          weekday: 'long',
                          hour: 'numeric',
                          minute: 'numeric',
                          timeZoneName: 'short',
                          timeZone: 'UTC',
                        },
                      },
                    })}
                  </li>
                ),
              )}
            </ul>
          </div>
        </Modal>
      </>
    );
  }

  if (race.everyTime) {
    return (
      <td>
        <div>
          {t('Every {{every}} starting at {{time, datetime}}', {
            every: race.everyTime.humanize().replace(/an?\s/, ''),
            time: moment().startOf('day').add(race.offset || 0).toDate(),
            formatParams: {
              time: { hour: 'numeric', minute: 'numeric', timeZone: 'UTC', timeZoneName: 'short' },
            },
          })}
        </div>
      </td>
    );
  }

  return <td>{t('No time data')}</td>;
}
