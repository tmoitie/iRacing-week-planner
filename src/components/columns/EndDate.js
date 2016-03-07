import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class EndDate extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  render() {
    const { race } = this.props;

    return (
      <td>
        <div>{
          moment(race.startTime).local().add(race.weekLength).subtract(1, 'days').format('YYYY-MM-DD')
        }</div>
      </td>
    );
  }
}
