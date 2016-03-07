import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class NextRace extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  render() {
    const { race } = this.props;

    if (race.nextTime === null) {
      return <td>No time data</td>;
    }

    return (
      <td>
        <div>
          {moment(race.nextTime).local().format('ddd h:mma')}
        </div>
      </td>
    );
  }
}
