// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import styles from './styles/purchaseGuide.module.scss';
import bootstrapStyles from '../../styles/main.module.scss';
import calculateCreditProgram from '../../lib/creditProgram';
import LicenceLevel from '../LicenceLevel';
import creditProgramStyles from './styles/creditProgram.module.scss';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  ownedTracks: Array<number>,
  ownedCars: Array<number>,
}

export default function CreditProgramModal({ isOpen, onClose, ownedTracks, ownedCars }: Props) {
  const creditProgramSeries = calculateCreditProgram({ ownedTracks, ownedCars });
  const { t } = useTranslation();

  return (
    <Modal id="creditProgramModal" isOpen={isOpen} onClose={onClose} title={t('Credit program')} doneAction={onClose}>
      <div className={bootstrapStyles['container-fluid']}>
        <p>
          {t(
            'Based on the cars and tracks you own, these are the series where you’re eligible to run at least 8 weeks '
            + 'and count towards the iRacing Participation Credit Program.',
          )}
        </p>
      </div>
      <div className={bootstrapStyles['table-responsive']}>
        <table className={`${bootstrapStyles.table} ${styles.purchaseTable}`}>
          <thead>
            <tr>
              <th>{t('Class')}</th>
              <th>{t('Serie')}</th>
              <th>{t('Tracks')}</th>
              <th>{t('Cars')}</th>
            </tr>
          </thead>
          <tbody>
            {creditProgramSeries.sort((a, b) => a.licenceLevel - b.licenceLevel).map((item) => (
              <tr key={item.name}>
                <td><LicenceLevel effective licence={item.licenceLevel} /></td>
                <td>
                  {item.name}
                </td>
                <td>
                  <ul>
                    {item.tracks.sort((a, b) => a.week - b.week).map((track) => (
                      <li key={track.name} className={track.hasRun && creditProgramStyles.hasRun}>
                        {t(track.name)}
                        {' '}
                        - W
                        {track.week}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {item.cars.map((series) => (
                      <li key={series.name}>
                        {t(series.name)}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
