import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class FavouriteStarButton extends Component {
  static propTypes = {
    enabled: PropTypes.bool,
    onClick: PropTypes.func
  }

  static defaultProps = {
    enabled: false,
    onClick: () => {}
  }

  render() {
    const {enabled, onClick} = this.props;

    return <span
      onClick={onClick.bind(null, !enabled)} className={classnames({
        glyphicon: true,
        'glyphicon-star': enabled,
        'glyphicon-star-empty': !enabled
      })} />
  }
}
