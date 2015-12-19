import React, { Component, PropTypes } from 'react';

export default class Type extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  render() {
    const { race } = this.props;

    return (
      <td>{race.type}</td>
    );
  }
}
