import * as React from 'react';
import CarModal from '../modal/CarModal';
import classnames from 'classnames';
import intersection from 'lodash.intersection';

type Props = {
  race: {
    carIds: Array<number>,
    carClasses: Array<string>,
    series: string,
  },
  favouriteCars: Array<number>,
  ownedCars: Array<number>,
};

export default function Car({race, favouriteCars, ownedCars}: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <td
      className={classnames({
        success: intersection(ownedCars, race.carIds).length !== 0,
        'clickable-cell': true,
      })}
      onClick={() => setModalOpen(true)}
    >
      <div>
        {intersection(favouriteCars, race.carIds).length !== 0 ? (
          <span className='glyphicon glyphicon-star' />
        ) : null}<span> </span>
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
