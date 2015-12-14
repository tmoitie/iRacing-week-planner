import React, { Component, PropTypes } from 'react';

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.node,
    onChange: PropTypes.func
  }

  static defaultProps = {
    checked: false,
    onChange: () => {}
  }

  render() {
    const {onChange, checked, children} = this.props;

    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" onChange={onChange} checked={checked} />
          {children}
        </label>
      </div>
    );
  }
}
