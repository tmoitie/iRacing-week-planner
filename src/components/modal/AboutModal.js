import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import changelog from '../../data/changelog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getContributorAction } from '../../actions/contributors';

function mapStateToProps({ contributors: { contributors } }) {
  return { contributors };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getContributors: getContributorAction }, dispatch);
}

export class AboutModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    contributors: PropTypes.array,
    getContributors: PropTypes.func.isRequired
  }

  static defaultProps = {
    onClose: () => {},
    getContributors: () => {}
  }

  componentDidMount() {
    this.updateContributors();
  }

  componentDidUpdate() {
    this.updateContributors();
  }

  updateContributors() {
    const { contributors, getContributors } = this.props;
    if (contributors === null) {
      getContributors();
    }
  }

  render() {
    const { onClose, contributors } = this.props;

    return (
      <Modal onClose={onClose} title='About' doneAction={onClose}>
        <div className='container-fluid'>

          <p>
            <span>This tool was created by <a href='https://twitter.com/tmoitie' target='_blank'>@tmoitie</a> (</span>
            <a
              href='http://members.iracing.com/membersite/member/CareerStats.do?custid=69636'
              target='_blank'
            >
              Tom Moitié
            </a>
            <span> on iRacing). Feel free to contact me via twitter or iRacing if you have any feedback or </span>
            <span>questions. The code is hosted publicly on </span>
            <a href='https://github.com/tmoitie/iRacing-week-planner' target='_blank'>Github</a>
            <span>. Thanks!</span>
          </p>

          <h3>Changelog</h3>
          {changelog.map(dayItem => (
            <div key={dayItem.date}>
              <h4>{dayItem.date.local().format('YYYY MMM DD')}</h4>
              <ul>
                {dayItem.items.map((changeItem, index) => <li key={index}>{changeItem}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutModal);
