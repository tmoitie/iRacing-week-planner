import React, { Component, PropTypes } from 'react';
import LicenceLevel from '../LicenceLevel';

export default class Class extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  render() {
    const { race } = this.props;

    return (
      <td><LicenceLevel effective licence={race.licenceLevel} /></td>
    );
  }
}
