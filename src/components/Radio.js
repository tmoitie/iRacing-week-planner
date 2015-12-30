import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Radio extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    children: PropTypes.node,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    name: PropTypes.string
  }

  static defaultProps = {
    selected: false,
    disabled: false,
    onChange: () => {}
  }

  render() {
    const {onChange, selected, disabled, children, name} = this.props;

    return (
      <div className={classnames({radio: true, disabled: disabled})}>
        <label>
          <input type='radio' onChange={onChange} checked={selected} disabled={disabled} name={name} />
          {children}
        </label>
      </div>
    );
  }
}
