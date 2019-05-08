import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import changelog from '../../data/changelog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getContributors as getContributorsAction } from '../../actions/contributors';

export class AboutModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    contributors: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    getContributors: PropTypes.func.isRequired
  }

  static defaultProps = {
    isOpen: false,
    loading: false,
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
    const { contributors, getContributors, loading } = this.props;
    if (contributors === null && loading === false) {
      getContributors();
    }
  }

  render() {
    const { onClose, isOpen, contributors, loading } = this.props;

    return (
      <Modal onClose={onClose} isOpen={isOpen} title='About' doneAction={onClose}>
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

          <h3>Contributors</h3>
          {loading ? <p>Loading</p> : null}
          {contributors ? (
            <ul className='row'>
              {contributors.map(contributor => (
                <li className='col-md-3 col-sm-4 col-xs-6' key={contributor.id}>
                  <a href={contributor.html_url} target='_blank'>
                    {contributor.login}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

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

const mapStateToProps = ({ contributors: { contributors, loading } }) => ({ contributors, loading });

const mapDispatchToProps = (dispatch) => bindActionCreators({ getContributors: getContributorsAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AboutModal);
