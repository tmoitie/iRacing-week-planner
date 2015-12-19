import React, { Component, PropTypes } from 'react';

export default class Fixed extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  render() {
    const { race } = this.props;

    return (
      <td>{race.fixed && <span className='glyphicon glyphicon-ok' />}</td>
    );
  }
}
