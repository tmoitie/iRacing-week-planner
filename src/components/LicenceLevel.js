// @flow

import * as React from 'react';
import classnames from 'classnames';

import levelToClass from '../lib/levelToClass';
import styles from './styles/licenceLevel.module.scss';

type Props = {
  licence: number,
  effective?: boolean,
};

export default function LicenceLevel({ licence, effective = false }: Props): React.Node {
  return (
    <div
      className={classnames(
        styles.licenceLevelComponent,
        styles[`licence${levelToClass(licence, effective).toUpperCase()}`],
      )}
    >
      <span className="licenceLetter">{levelToClass(licence, effective)}</span>
      <span className="licenceText">
        {effective ? null : (((licence - 1) % 4) + 1).toFixed(2)}
      </span>
    </div>
  );
}
