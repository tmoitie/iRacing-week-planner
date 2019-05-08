import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import levelToClass from '../lib/levelToClass';
import './styles/licenceLevel.scss';

export default function LicenceLevel({ licence, effective }) {
  return (
    <div
      className={classnames(
        'licence-level-component',
        `licence-${levelToClass(licence, effective).toLowerCase()}`
      )}
    >
      <span className='licence-letter'>{levelToClass(licence, effective)}</span>
      {effective ? null : (((licence - 1) % 4) + 1).toFixed(2)}
    </div>
  );
}

LicenceLevel.propTypes = {
  licence: PropTypes.number.isRequired,
  effective: PropTypes.bool
};
