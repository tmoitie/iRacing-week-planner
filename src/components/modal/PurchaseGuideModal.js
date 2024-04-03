// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ShoppingCartIcon from '../icon/ShoppingCartIcon';
import Modal from './Modal';
import purchaseOptimization from '../../lib/purchaseOptimization';
import styles from './styles/purchaseGuide.module.scss';
import bootstrapStyles from '../../styles/main.module.scss';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  ownedTracks: Array<number>,
  favouriteSeries: Array<number>,
}

export default function PurchaseGuideModal({ isOpen, onClose, ownedTracks, favouriteSeries }: Props) {
  const purchaseItems = purchaseOptimization({ ownedTracks, favouriteSeries });
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('Purchase Guide')} doneAction={onClose} id="purchaseGuideModal">
      <div className={bootstrapStyles['container-fluid']}>
        <p>
          {t(
            'These unowned tracks from your favorite series appear multiple times for this season. '
              + 'You can purchase these tracks with the direct link.',
          )}
        </p>
        <div className={bootstrapStyles['table-responsive']}>
          <table className={`${bootstrapStyles.table} ${styles.purchaseTable}`}>
            <thead>
              <tr>
                <th>{t('Count')}</th>
                <th>{t('Track')}</th>
                <th>{t('Series')}</th>
                <th>{t('Link')}</th>
              </tr>
            </thead>
            <tbody>
              {purchaseItems.map((item) => (
                <tr key={item.track.name}>
                  <td>{item.count}</td>
                  <td>{t(item.track.name)}</td>
                  <td>
                    <ul>
                      {item.series.map((series) => (
                        <li key={series.seriesname}>
                          {t(series.seriesname)}
                          {' '}
                          (
                          {t('Week {{week}}', { week: series.racedOnWeek + 1 })}
                          )
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <a
                      href={`https://members.iracing.com/membersite/member/TrackDetail.do?trkid=${item.track.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ShoppingCartIcon />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
