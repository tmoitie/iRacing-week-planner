// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import StarIcon from '../icon/StarIcon';
import SeriesModal from '../modal/SeriesModal';
import styles from './styles/columns.module.scss';

type Props = {
  race: {
    seriesId: number,
    series: string,
  },
  favouriteSeries: Array<number>,
  ownedTracks: Array<number>,
};

export default function Series({ race, favouriteSeries, ownedTracks }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { t } = useTranslation();

  return (
    <td className={styles.clickableCell}>
      <button type="button" className={styles.cellButton} onClick={openModal} onKeyPress={openModal}>
        {favouriteSeries.indexOf(race.seriesId) !== -1 ? (
          <StarIcon />
        ) : null}

        <span> </span>

        {t(race.series)}
      </button>
      <SeriesModal isOpen={modalOpen} onClose={closeModal} ownedTracks={ownedTracks} seriesId={race.seriesId} />
    </td>
  );
}
