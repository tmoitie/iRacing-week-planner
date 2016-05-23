import React, { Component, PropTypes } from 'react';

export default class NextRace extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  render() {
    const { race } = this.props;

    return (
      <td>
        <a
          href={`http://members.iracing.com/membersite/member/SeriesNews.do?season=${race.seasonId}`}
          target='_blank'>
          <span className='glyphicon glyphicon-link' />
        </a>
      </td>
    );
  }
}
