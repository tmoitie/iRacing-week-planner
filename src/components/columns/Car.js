import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { intersection } from 'lodash';

export default class Car extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    ownedCars: PropTypes.array.isRequired,
    favouriteCars: PropTypes.array.isRequired
  }

  render() {
    const { ownedCars, race, favouriteCars } = this.props;

    return (
      <td className={classnames({success: intersection(ownedCars, race.carIds).length !== 0})}>
        {intersection(favouriteCars, race.carIds).length !== 0 ? (
          <span className='glyphicon glyphicon-star' />
        ) : null}<span> </span>
        {race.carClasses.join(', ')}
      </td>
    );
  }
}
