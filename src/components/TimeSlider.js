import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'jquery-ui/slider';
import moment from 'moment';

import 'jquery-ui/themes/base/jquery.ui.core.css';
import 'jquery-ui/themes/base/jquery.ui.slider.css';
import 'jquery-ui/themes/black-tie/jquery.ui.theme.css';

export default class TimeSlider extends Component {
  static propTypes = {
    minFrom: PropTypes.number.isRequired,
    maxTo: PropTypes.number.isRequired,
    initial: PropTypes.number.isRequired,
    step: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    step: 1,
    onChange: () => {}
  }

  componentDidMount() {
    const {minFrom, maxTo, initial, step} = this.props;
    $(ReactDOM.findDOMNode(this)).slider({
      range: false,
      min: minFrom,
      max: maxTo,
      animate: true,
      step: step,
      value: initial,
      slide: this.handleSlide.bind(this)
    });
  }

  handleSlide(e, v) {
    this.props.onChange(v.value);
  }

  render() {
    return <div />;
  }
}
