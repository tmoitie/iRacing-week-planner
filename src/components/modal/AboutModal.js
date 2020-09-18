import React from 'react';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import BuyACoffee from '../BuyACoffee';
import Modal from './Modal';
import changelog from '../../data/changelog';
import contributors from '../../data/contributors.json';

export default function AboutModal({ onClose, isOpen }) {
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

        <p>
          <Trans>
            This is now costing me a few quid a month to run, so if you like using this tool, please feel free
            to <a href='https://www.buymeacoffee.com/tmoitie'
               target='_blank'
            >buy me a coffee</a>.
          </Trans>
        </p>

        <p>
          <BuyACoffee />
        </p>

        <h3>{t('Contributors')}</h3>
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
};

AboutModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
};
