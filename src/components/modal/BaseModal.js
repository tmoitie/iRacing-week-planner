import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class BaseModal extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string
  };

  static defaultProps = {
    children: null,
    style: {},
    className: 'modal-component'
  }

  componentDidMount() {
    this.node = document.createElement('div');
    document.body.className = 'modal-open';
    document.body.appendChild(this.node);
    this.renderChild();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.node);
    this.node.remove();
    document.body.className = document.body.className.replace(/modal\-open/, '');
  }

  renderChild() {
    const { className, style, children } = this.props;

    ReactDOM.render((<div className={className} style={style}>
      {children}
    </div>), this.node);
  }

  render() {
    return null;
  }
}
