// @flow

import * as React from 'react';
import classnames from 'classnames';
import intersection from 'lodash.intersection';
import StarIcon from '../icon/StarIcon';
import CarModal from '../modal/CarModal';
import raceListingStyles from '../styles/raceListing.module.scss';

import styles from '../../styles/main.module.scss';

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

  return (
    <td
      className={classnames({
        [styles.success]: intersection(ownedCars, race.carIds).length !== 0,
        [raceListingStyles.clickableCell]: true,
      })}
      onClick={() => setModalOpen(true)}
    >
      <div>
        {intersection(favouriteCars, race.carIds).length !== 0 ? (
          <StarIcon />
        ) : null}
        <span> </span>
        {race.carClasses.join(', ')}
      </div>
      <CarModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ownedCars={ownedCars}
        favouriteCars={favouriteCars}
        carIds={race.carIds}
        seriesName={race.series}
      />
    </td>
  );
}
