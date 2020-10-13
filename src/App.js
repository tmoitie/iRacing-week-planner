import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Slider } from '@blueprintjs/core';
import { withTranslation } from 'react-i18next';
import 'firebase/auth';
import classNames from 'classnames';
import { updateSetting } from './actions/settings';
import BuyACoffee from './components/BuyACoffee';

import { defaultSettings } from './reducers/settings';
import { changeModal, updateDays as updateDaysCreator } from './actions/app';
import { signOut, startListener } from './actions/auth';
import LoginModal from './components/modal/LoginModal';

import { tracks, cars } from './data';
import RaceListing from './components/RaceListing';
import Filters from './components/Filters';
import FavouriteSeriesModal from './components/modal/FavouriteSeriesModal';
import ContentModal from './components/modal/ContentModal';
import OptionsModal from './components/modal/OptionsModal';
import AboutModal from './components/modal/AboutModal';

import { seasonStart, seasonEnd } from './config';

import PurchaseGuideModal from './components/modal/PurchaseGuideModal';

import styles from './styles/main.scss';

import { languages } from './i18n';

const seasonLengthDays = seasonEnd.diff(seasonStart, 'days');

export class App extends Component {
  static propTypes = {
    date: PropTypes.object,
    dateDays: PropTypes.number,
    week: PropTypes.number,
    updateDays: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    user: PropTypes.object,
    settings: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    startListener: PropTypes.func.isRequired,
    updateSetting: PropTypes.func.isRequired,
    currentModal: PropTypes.string,
    changeModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentModal: null,
    user: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      languageDropdown: false,
    };
    this.dropdownRef = React.createRef();
  }

  componentDidMount() {
    this.props.startListener();
  }

  getCloseModalHandler() {
    return (e = { preventDefault: () => {} }) => {
      e.preventDefault();
      this.props.changeModal(null);
    }
  }

  getOpenModalHandler(modalName) {
    return (e = { preventDefault: () => {} }) => {
      e.preventDefault();

      this.props.changeModal(modalName);
    };
  }

  getSwitchLanguageHandler(language) {
    return (e) => {
      e.preventDefault();
      this.setState({ languageDropdown: false });
      this.props.i18n.changeLanguage(language);
    }
  }

  getSettingUpdater(key) {
    return (value) => {
      this.props.updateSetting(key, value);
    }
  }

  renderFavouriteSeriesModal() {
    const { favouriteSeries } = this.props.settings;
    const { currentModal } = this.props;
    return (
      <FavouriteSeriesModal
        isOpen={currentModal === 'favourite-series'}
        onClose={this.getCloseModalHandler()}
        favouriteSeries={favouriteSeries}
        save={this.getSettingUpdater('favouriteSeries')}
      />
    );
  }

  renderMyTracksModal() {
    const { favouriteTracks, ownedTracks } = this.props.settings;
    const { currentModal } = this.props;
    const { t } = this.props;
    return (
      <ContentModal
        id="content-modal-tracks"
        isOpen={currentModal === 'my-tracks'}
        onClose={this.getCloseModalHandler()}
        title={t('Set my tracks')}
        ownedContent={ownedTracks}
        content={tracks}
        idField='pkgid'
        defaultContent={[...defaultSettings.ownedTracks]}
        typeFilter={{ key: 'primaryType', oval: 'oval', road: 'road' }}
        save={(value) => this.props.updateSetting('ownedTracks', value)}
        favourites={favouriteTracks}
        saveFavourites={(value) => this.props.updateSetting('favouriteTracks', value)}
      />
    );
  }

  renderMyCarsModal() {
    const { favouriteCars, ownedCars } = this.props.settings;
    const { currentModal } = this.props;
    const { t } = this.props;
    return (
      <ContentModal
        id="content-modal-cars"
        isOpen={currentModal === 'my-cars'}
        onClose={this.getCloseModalHandler()}
        title={t('Set my cars')}
        ownedContent={ownedCars}
        content={cars}
        idField='sku'
        defaultContent={[...defaultSettings.ownedCars]}
        typeFilter={{ key: 'discountGroupNames', oval: ['oval+car'], road: ['road+car'] }}
        save={this.getSettingUpdater('ownedCars')}
        favourites={favouriteCars}
        saveFavourites={this.getSettingUpdater('favouriteCars')}
      />
    );
  }

  renderOptionsModal() {
    const { columns } = this.props.settings;
    const { currentModal } = this.props;
    return (
      <OptionsModal
        isOpen={currentModal === 'options'}
        onClose={this.getCloseModalHandler()}
        columnIds={columns}
        saveOptions={this.props.updateSetting}
      />
    );
  }

  renderChangelogModal() {
    const { currentModal } = this.props;
    return <AboutModal isOpen={currentModal === 'about'} onClose={this.getCloseModalHandler()} />;
  }

  renderPurchaseGuideModal() {
    const { favouriteSeries, ownedTracks } = this.props.settings;
    const { currentModal } = this.props;
    return (
      <PurchaseGuideModal
        isOpen={currentModal === 'purchase-guide'}
        onClose={this.getCloseModalHandler()}
        ownedTracks={ownedTracks}
        favouriteSeries={favouriteSeries}
      />
    );
  }

  renderLoginModal() {
    const { currentModal } = this.props;
    return (
      <LoginModal
        isOpen={currentModal === 'login'}
        onClose={this.getCloseModalHandler()}
      />
    );
  }

  getToggleLangDropdownHandler() {
    return (e) => {
      e.preventDefault();
      this.setState((prevState) => ({ languageDropdown: !prevState.languageDropdown }));
    };
  }

  getClickEventHandler() {
    return (e) => {
      const { languageDropdown } = this.state;
      if (!this.dropdownRef.current.contains(e.target) && languageDropdown === true) {
        this.setState({ languageDropdown: false });
      }
    };
  }

  render() {
    const {
      date, dateDays, week, t, i18n, user, signOut,
    } = this.props;

    const {
      filters, favouriteSeries, favouriteCars, favouriteTracks,
      columns, sort, ownedCars, ownedTracks,
    } = this.props.settings;

    const { languageDropdown } = this.state;

    return (
      <div onMouseDown={this.getClickEventHandler()}>
        <nav className={`${styles.navbar} ${styles['navbar-inverse']}`}>
          <div className={styles['container-fluid']}>
            <div className={styles['navbar-header']}>
              <a className={styles['navbar-brand']} href=''>{t('iRacing Week Planner')}</a>
            </div>

            <ul className={`${styles.nav} ${styles['navbar-nav']} ${styles['navbar-left']}`}>
              <li>
                <a href='' onClick={this.getOpenModalHandler('purchase-guide')}>
                  {t('Purchase guide')}
                </a>
              </li>
            </ul>

            <ul className={`nav ${styles['navbar-nav']} ${styles['navbar-right']}`}>
              <li><a href='' onClick={this.getOpenModalHandler('my-tracks')}>
                {t('Set my tracks')}
              </a></li>
              <li><a href='' onClick={this.getOpenModalHandler('my-cars')}>
                {t('Set my cars')}
              </a></li>
              <li><a href='' onClick={this.getOpenModalHandler('favourite-series')}>
                {t('Set favorite series')}
              </a></li>
              <li><a href='' onClick={this.getOpenModalHandler('options')}>
                {t('Options')}
              </a></li>
              <li><a href='' onClick={this.getOpenModalHandler('about')}>
                {t('About')}
              </a></li>
              {user ? (
                <li><a href='' onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}>
                  {t('Sign out')}
                </a></li>
              ) : (
                <li><a href='' onClick={this.getOpenModalHandler('login')}>
                  {t('Sign in')}
                </a></li>
              )}
              <li className={classNames({ [styles.dropdown]: true, [styles.open]: languageDropdown })}>
                <a
                  href=""
                  onClick={this.getToggleLangDropdownHandler()}
                >
                  {languages[i18n.language].flag}
                  <span className={styles.caret} />
                </a>
                <ul className={styles['dropdown-menu']} ref={this.dropdownRef}>
                  {Object.entries(languages).map(([code, language]) => (
                    <li key={code}>
                      <a href="" onClick={this.getSwitchLanguageHandler(code)}>
                        {language.flag}
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
        <div className={styles['container-fluid']}>
          <div className={styles.row}>
            <div className={styles['col-md-2']}>
              <div>
                <BuyACoffee />
              </div>
              <h3>{t('Filters')}</h3>
              <Filters />
            </div>
            <div className={styles['col-md-10']}>
              <div className={styles.row}>
                <h3 className={styles['col-xs-8']}>
                  {t('Races for date: {{date, YYYY MMM DD}}', { date: date.local().toDate() })}
                </h3>
                <h3 className={styles['col-xs-4']} style={{ textAlign: 'right' }}>
                  {t('Week {{week}}', { week })}
                </h3>
              </div>
              <div style={{ marginBottom: 10 }}>
                <Slider
                  min={0}
                  max={seasonLengthDays}
                  value={dateDays}
                  stepSize={1}
                  onChange={this.props.updateDays}
                  labelRenderer={false}
                />
              </div>
              <RaceListing
                filters={filters}
                ownedCars={ownedCars}
                ownedTracks={ownedTracks}
                favouriteSeries={favouriteSeries}
                date={date}
                favouriteTracks={favouriteTracks}
                favouriteCars={favouriteCars}
                columnIds={columns}
                sort={sort}
                updateSort={this.getSettingUpdater('sort')}
              />
            </div>
          </div>
        </div>
        {this.renderPurchaseGuideModal()}
        {this.renderMyCarsModal()}
        {this.renderOptionsModal()}
        {this.renderChangelogModal()}
        {this.renderFavouriteSeriesModal()}
        {this.renderMyTracksModal()}
        {this.renderLoginModal()}
      </div>
    );
  }
}

const AppWithTranslation = withTranslation()(App);

const mapStateToProps = (state) => ({
  date: state.app.date,
  dateDays: state.app.daysSinceSeasonStart,
  week: state.app.week,
  user: state.auth.user,
  settings: state.settings,
  currentModal: state.app.currentModal,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateDays: updateDaysCreator,
  signOut,
  startListener,
  updateSetting,
  changeModal,
}, dispatch);

const AppWithRedux = connect(mapStateToProps, mapDispatchToProps)(AppWithTranslation)

export default AppWithRedux;
