import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import levelToClass from '../lib/levelToClass';
import './styles/licenceLevel.scss';

const levels = ['R', 'D', 'C', 'B', 'A', 'P'];

export default class LicenceLevel extends Component {
  static propTypes = {
    licence: PropTypes.number.isRequired,
    effective: PropTypes.boolean
  }

  render() {
    const { licence, effective } = this.props;

    return (
      <div className={classnames(
        'licence-level-component',
        `licence-${levelToClass(licence, effective).toLowerCase()}`
      )}>
        <span className='licence-letter'>{levelToClass(licence, effective)}</span>
        {effective ? null : (((licence - 1) % 4) + 1).toFixed(2)}
      </div>
    );
  }
}
