import React from 'react';
import PropTypes from 'prop-types';

export default function Link({ race }) {
  return (
    <td>
      <a
        href={`http://members.iracing.com/membersite/member/SeriesSessions.do?season=${race.seasonId}`}
        target='_blank'>
        <span className='glyphicon glyphicon-link' />
      </a>
    </td>
  );
}

Link.propTypes = {
  race: PropTypes.object.isRequired
};
