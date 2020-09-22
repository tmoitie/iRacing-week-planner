// @flow

import * as React from 'react';
import classnames from 'classnames';

type Props = {
  onClick: (newValue: boolean) => void,
  enabled: boolean,
};

export default function FavouriteStarButton({ enabled, onClick }: Props): React.Node {
  return (
    <span
      onClick={() => onClick(!enabled)} className={classnames({
        glyphicon: true,
        'glyphicon-star': enabled,
        'glyphicon-star-empty': !enabled
      })}
    />
  );
}

FavouriteStarButton.defaultProps = {
  enabled: false,
  onClick: () => {}
};
