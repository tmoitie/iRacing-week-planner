import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class EndDate extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  render() {
    const { race } = this.props;

    return (
      <td>{
        moment(race.startTime + race.weekLength, 'x').subtract(1, 'days').format('YYYY-MM-DD')
      }</td>
    );
  }
}
