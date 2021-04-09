// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';

import styles from '../../styles/main.module.scss';

type Props = {
  onClose: () => void,
  isOpen: boolean,
  trackId: number,
  track: string,
};

export default function TrackModal({ onClose, trackId, isOpen, track }: Props) {
  const { t } = useTranslation();
  const img = "/static/tracks/"+ trackId + ".png";
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('{{trackname}}', {
        trackname: t(track),
      })}
      doneAction={onClose}
    >
      <div className={styles['container-fluid']}>
        <div className={styles['table-responsive']}>
          <img src={img} alt={track} style={{width: '100%'}}/>
        </div>
      </div>
    </Modal>
  );
}
