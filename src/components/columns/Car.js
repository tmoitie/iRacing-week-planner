// @flow

import * as React from 'react';
import classnames from 'classnames';
import intersection from 'lodash.intersection';
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

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <ClickableCell
        className={classnames({
          [styles.success]: intersection(ownedCars, race.carIds).length !== 0,
        })}
        onClick={openModal}
      >
        {intersection(favouriteCars, race.carIds).length !== 0 ? (
          <StarIcon />
        ) : null}
        <span> </span>
        {race.carClasses.join(', ')}
      </ClickableCell>
      <CarModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ownedCars={ownedCars}
        favouriteCars={favouriteCars}
        carIds={race.carIds}
        seriesName={race.series}
      />
    </>
  );
}
