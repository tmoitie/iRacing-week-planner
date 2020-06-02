import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import Modal from './Modal';
import changelog from '../../data/changelog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getContributors as getContributorsAction } from '../../actions/contributors';

export function AboutModal({ onClose, isOpen, contributors, getContributors, loading }) {
  useEffect(() => {
    if (contributors === null && loading === false) {
      getContributors();
    }
  }, []);
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose} isOpen={isOpen} title={t('About')} doneAction={onClose}>
      <div className='container-fluid'>
        <p>
          <Trans>
            This tool was created by <a href='https://twitter.com/tmoitie' target='_blank'>
              tmoitie
            </a> (<a
              href='http://members.iracing.com/membersite/member/CareerStats.do?custid=69636'
              target='_blank'
            >
              Tom Moitié
            </a> on iRacing).
            Feel free to contact me via twitter or iRacing if you have any feedback or questions. The code is hosted
            publicly on <a href='https://github.com/tmoitie/iRacing-week-planner' target='_blank'>Github</a>. Thanks!
          </Trans>
        </p>

        <h3>{t('Contributors')}</h3>
        {loading ? <p>{t('Loading')}</p> : null}
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

        <h3>{t('Changelog')}</h3>
        {changelog.map(dayItem => (
          <div key={dayItem.date}>
            <h4>{t('{{date, YYYY MMMM DD}}', { date: dayItem.date.local().toDate() })}</h4>
            <ul>
              {dayItem.items.map((changeItem) => <li key={changeItem}>{changeItem}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Modal>
  );
}

AboutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contributors: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  getContributors: PropTypes.func,
};

AboutModal.defaultProps = {
  isOpen: false,
  loading: false,
  onClose: () => {},
  getContributors: () => {},
};

const mapStateToProps = ({ contributors: { contributors, loading } }) => ({ contributors, loading });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getContributors: getContributorsAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AboutModal);
