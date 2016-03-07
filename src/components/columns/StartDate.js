import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class StartDate extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  render() {
    const { race } = this.props;

    return (
      <td>
        <div>
          {moment(race.startTime).local().format('YYYY-MM-DD')}
        </div>
      </td>
    );
  }
}
