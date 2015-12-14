import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import levelToClass from '../lib/levelToClass';
import './styles/licenceLevel.scss';

const levels = ['R', 'D', 'C', 'B', 'A', 'P'];

export default class LicenceLevel extends Component {
  static propTypes = {
    licence: PropTypes.number.isRequired
  }

  render() {
    const { licence } = this.props;

    return (
      <div className={classnames('licence-level-component', `licence-${levelToClass(licence).toLowerCase()}`)}>
        <span className='licence-letter'>{levelToClass(licence)}</span>
        {(((licence - 1) % 4) + 1).toFixed(2)}
      </div>
    );
  }
}
