import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class StartDate extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  render() {
    const { race } = this.props;

    return (
      <td>{moment(race.startTime, 'x').format('YYYY-MM-DD')}</td>
    );
  }
}
