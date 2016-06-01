import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { intersection } from 'lodash';

export default function Car({ ownedCars, race, favouriteCars }) {
  return (
    <td className={classnames({ success: intersection(ownedCars, race.carIds).length !== 0 })}>
      <div>
        {intersection(favouriteCars, race.carIds).length !== 0 ? (
          <span className='glyphicon glyphicon-star' />
        ) : null}<span> </span>
        {race.carClasses.join(', ')}
      </div>
    </td>
  );
}

Car.propTypes = {
  race: PropTypes.object.isRequired,
  ownedCars: PropTypes.array.isRequired,
  favouriteCars: PropTypes.array.isRequired
};
