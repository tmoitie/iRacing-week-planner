import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.node,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    checked: false,
    disabled: false,
    onChange: () => {}
  }

  render() {
    const {onChange, checked, disabled, children} = this.props;

    return (
      <div className={classnames({checkbox: true, disabled: disabled})}>
        <label>
          <input type='checkbox' onChange={onChange} checked={checked} disabled={disabled} />
          {children}
        </label>
      </div>
    );
  }
}
