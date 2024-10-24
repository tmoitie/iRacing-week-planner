// @flow

import * as React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from '../styles/main.module.scss';

type Props = {
  id: String,
  onClick: (newValue: boolean) => void,
  enabled?: boolean,
};

export default function FavouriteStarButton({ id, enabled = false, onClick }: Props): React.Node {
  const { t } = useTranslation();

  return (
    <span
      role="button"
      tabIndex={0}
      data-testid={id}
      onClick={() => onClick(!enabled)}
      onKeyDown={() => onClick(!enabled)}
      className={classnames({
        [styles.glyphicon]: true,
        [styles['glyphicon-star']]: enabled,
        [styles['glyphicon-star-empty']]: !enabled,
      })}
      aria-label={t(enabled ? 'Remove favorite' : 'Add favorite')}
    />
  );
}
