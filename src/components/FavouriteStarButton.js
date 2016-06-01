import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function FavouriteStarButton({ enabled, onClick }) {
  return (
    <span
      onClick={onClick.bind(null, !enabled)} className={classnames({
        glyphicon: true,
        'glyphicon-star': enabled,
        'glyphicon-star-empty': !enabled
      })}
    />
  );
}

FavouriteStarButton.propTypes = {
  enabled: PropTypes.bool,
  onClick: PropTypes.func
};

FavouriteStarButton.defaultProps = {
  enabled: false,
  onClick: () => {}
};
