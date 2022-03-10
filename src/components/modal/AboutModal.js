// @flow

import * as React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import BuyACoffee from '../BuyACoffee';
import Modal from './Modal';
import changelog from '../../data/changelog';
import contributors from '../../data/contributors.json';

import styles from '../../styles/main.module.scss';

type Props = {
  onClose: () => void,
  isOpen: boolean,
};

export default function AboutModal({ onClose, isOpen }: Props) {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose} isOpen={isOpen} title={t('About')} doneAction={onClose}>
      <div className={styles['container-fluid']}>
        <p>
          <Trans>
            This tool was created by
            {' '}
            <a href="https://twitter.com/tmoitie" target="_blank" rel="noreferrer">
              tmoitie
            </a>
            {' '}
            (
            <a
              href="http://members.iracing.com/membersite/member/CareerStats.do?custid=69636"
              target="_blank"
              rel="noreferrer"
            >
              Tom Moitié
            </a>
            {' '}
            on iRacing).
            Feel free to contact me via twitter or iRacing if you have any feedback or questions. The code is hosted
            publicly on
            {' '}
            <a href="https://github.com/tmoitie/iRacing-week-planner" target="_blank" rel="noreferrer">Github</a>
            . Thanks!
          </Trans>
        </p>

        <p>
          <Trans>
            This is now costing me a few quid a month to run, so if you like using this tool, please feel free
            to
            {' '}
            <a
              href="https://www.buymeacoffee.com/tmoitie"
              target="_blank"
              rel="noreferrer"
            >
              buy me a coffee
            </a>
            .
          </Trans>
        </p>

        <p>
          <BuyACoffee />
        </p>

        <h3>{t('Contributors')}</h3>
        <ul className={styles.row}>
          {contributors.map((contributor) => (
            <li className={`${styles['col-md-3']} ${styles['col-sm-4']} ${styles['col-xs-6']}`} key={contributor.id}>
              <a href={contributor.html_url} target="_blank" rel="noreferrer">
                {contributor.login}
              </a>
            </li>
          ))}
        </ul>

        <h3>{t('Changelog')}</h3>
        {changelog.map((dayItem) => (
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
