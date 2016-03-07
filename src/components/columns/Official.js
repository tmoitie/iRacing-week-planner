import React, { Component, PropTypes } from 'react';

export default class Official extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  render() {
    const { race } = this.props;

    return (
      <td>
        <div>
          {race.official && <span className='glyphicon glyphicon-ok' />}
        </div>
      </td>
    );
  }
}
