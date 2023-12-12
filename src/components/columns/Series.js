// @flow

import classnames from 'classnames';
import intersection from 'lodash.intersection';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import StarIcon from '../icon/StarIcon';
import SeriesModal from '../modal/SeriesModal';
import ClickableCell from './ClickableCell';
import styles from './styles/columns.module.scss';

type Props = {
  race: {
    seriesId: number,
    series: string,
    seasonId: number,
  },
  favouriteSeries: Array<number>,
  ownedTracks: Array<number>,
  ownedCars: Array<number>,
};

export default function Series({ race, favouriteSeries, ownedTracks, ownedCars }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { t } = useTranslation();

  return (
    <>
      <ClickableCell onClick={openModal}>
        {favouriteSeries.indexOf(race.seriesId) !== -1 ? (
          <StarIcon />
        ) : null}

        <span> </span>

        {t(race.series)}
      </ClickableCell>
      {modalOpen ? (
        <SeriesModal
          isOpen={modalOpen}
          onClose={closeModal}
          ownedTracks={ownedTracks}
          ownedCars={ownedCars}
          seriesId={race.seriesId}
          seasonId={race.seasonId}
        />
      ) : null}
    </>
  );
}
