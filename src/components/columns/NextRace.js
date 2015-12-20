import React, { Component, PropTypes } from 'react';

export default class NextRace extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  render() {
    const { race } = this.props;

    if (race.nextTime === null) {
      return <td>No time data</td>;
    }

    return <td>{race.nextTime.local().format('ddd h:mma')}</td>;
  }
}
