// @flow

import * as React from 'react';
import classnames from 'classnames';
import intersection from 'lodash.intersection';
import { useTranslation } from 'react-i18next';
import StarIcon from '../icon/StarIcon';
import CarModal from '../modal/CarModal';

import styles from '../../styles/main.module.scss';
import ClickableCell from './ClickableCell';

type Props = {
  race: {
    carIds: Array<number>,
    carClasses: Array<string>,
    series: string,
  },
  favouriteCars: Array<number>,
  ownedCars: Array<number>,
};

export default function Car({ race, favouriteCars, ownedCars }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { t } = useTranslation();

  const openModal = () => {
    setModalOpen(true);
  };

  const knownCar = race.carIds[0] !== null;

  return (
    <>
      <ClickableCell
        className={classnames({
          [styles.success]: knownCar ? intersection(ownedCars, race.carIds).length !== 0 : false,
        })}
        onClick={openModal}
      >
        {knownCar && intersection(favouriteCars, race.carIds).length !== 0 ? (
          <StarIcon />
        ) : null}
        <span> </span>
        {knownCar ? race.carClasses.join(', ') : t('Unknown')}
      </ClickableCell>
      {knownCar ? (
        <CarModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          ownedCars={ownedCars}
          favouriteCars={favouriteCars}
          carIds={race.carIds}
          seriesName={race.series}
          seriesId={race.seriesId}
        />
      ) : null}
    </>
  );
}
