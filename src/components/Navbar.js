// @flow

import * as React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { changeModal } from '../actions/app';
import { signOut } from '../actions/auth';
import languages from '../i18n';
import styles from '../styles/main.module.scss';

const userSelector = (state) => state.auth.user;

function useOutsideAlerter(ref, callback) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [languageDropdown, setLanguageDropdown] = React.useState(false);
  const dropdownRef = React.useRef(null);
  useOutsideAlerter(dropdownRef, React.useCallback(() => {
    if (languageDropdown === true) {
      setLanguageDropdown(false);
    }
  }, [languageDropdown, setLanguageDropdown]));
  const user = useSelector(userSelector, shallowEqual);
  const dispatch = useDispatch();
  const getModalChangeClick = (modalName) => (e) => {
    e.preventDefault();
    dispatch(changeModal(modalName));
  };
  return (
    <nav className={`${styles.navbar} ${styles['navbar-inverse']}`}>
      <div className={styles['container-fluid']}>
        <div className={styles['navbar-header']}>
          <a className={styles['navbar-brand']} href="/">{t('iRacing Week Planner')}</a>
        </div>

        <ul className={`${styles.nav} ${styles['navbar-nav']} ${styles['navbar-left']}`}>
          <li>
            <a
              id="navbar-link-purchase-guide"
              href=""
              onClick={getModalChangeClick('purchase-guide')}
            >
              {t('Purchase guide')}
            </a>
          </li>
        </ul>

        <ul className={`${styles.nav} ${styles['navbar-nav']} ${styles['navbar-right']}`}>
          <li>
            <a
              id="navbar-link-my-tracks"
              href=""
              onClick={getModalChangeClick('my-tracks')}
            >
              {t('Set my tracks')}
            </a>
          </li>
          <li>
            <a
              id="navbar-link-my-cars"
              href=""
              onClick={getModalChangeClick('my-cars')}
            >
              {t('Set my cars')}
            </a>
          </li>
          <li>
            <a
              id="navbar-link-favourite-series"
              href=""
              onClick={getModalChangeClick('favourite-series')}
            >
              {t('Set favorite series')}
            </a>
          </li>
          <li>
            <a
              id="navbar-link-options"
              href=""
              onClick={getModalChangeClick('options')}
            >
              {t('Options')}
            </a>
          </li>
          <li>
            <a
              href=""
              id="navbar-link-about"
              onClick={getModalChangeClick('about')}
            >
              {t('About')}
            </a>
          </li>
          {user ? (
            <li>
              <a
                id="navbar-link-sign-out"
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(signOut());
                }}
              >
                {t('Sign out')}
              </a>
            </li>
          ) : (
            <li>
              <a id="navbar-link-sign-in" href="" onClick={getModalChangeClick('login')}>
                {t('Sign in')}
              </a>
            </li>
          )}
          <li
            id="navbar-language-dropdown"
            className={classNames({ [styles.dropdown]: true, [styles.open]: languageDropdown })}
          >
            <a
              id="navbar-link-open-language-dropdown"
              href=""
              onClick={(e) => {
                e.preventDefault();
                setLanguageDropdown(!languageDropdown);
              }}
            >
              {languages[i18n.language].flag}
              {' '}
              <span className={styles.caret} />
            </a>
            <ul className={styles['dropdown-menu']} ref={dropdownRef}>
              {Object.entries(languages).map(([code, language]) => (
                <li key={code}>
                  <a
                    id={`navbar-link-language-${code}`}
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setLanguageDropdown(false);
                      i18n.changeLanguage(code);
                    }}
                  >
                    {language.flag}
                    {' '}
                    {language.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/tmoitie/iRacing-week-planner/blob/master/Translate.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  Help me translate!
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
