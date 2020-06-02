import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uniq from 'lodash.uniq';
import uniqBy from 'lodash.uniqby';
import { withTranslation } from 'react-i18next';
import { updateDays as updateDaysCreator } from './actions/app';

import RaceListing from './components/RaceListing';
import Filters from './components/Filters';
import FavouriteSeriesModal from './components/modal/FavouriteSeriesModal';
import ContentModal from './components/modal/ContentModal';
import OptionsModal from './components/modal/OptionsModal';
import AboutModal from './components/modal/AboutModal';

import allCars from './data/cars.json';
import tracks from './data/tracks.json';
import availableColumns from './data/availableColumns';

import { seasonStart, seasonEnd } from './config';

import { Slider } from '@blueprintjs/core';

import './components/styles/preBootstrap.scss';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '@blueprintjs/core/lib/css/blueprint.css';

import 'bootstrap-sass';
import { languageFlags } from './i18n';

const cars = uniqBy(allCars, (car) => car.sku);

const defaultFilters = {
  type: ['Road', 'Oval', 'Dirt', 'RX'],
  licence: ['R', 'D', 'C', 'B', 'A', 'P'],
  official: [false, true],
  fixed: [false, true],
  ownedCars: false,
  ownedTracks: false,
  favouriteSeries: false,
  favouriteTracksOnly: false,
  favouriteCarsOnly: false
};

const defaultSettings = {
  filters: defaultFilters,
  ownedCars: cars.filter(car => car.freeWithSubscription === true).map(car => car.sku),
  ownedTracks: tracks.filter(track => track.default).map(track => track.id),
  favouriteSeries: [],
  favouriteCars: [],
  favouriteTracks: [],
  sort: { key: 'licence', order: 'asc' },
  columns: availableColumns.filter(column => column.default === true).map(column => column.id)
};

const seasonLengthDays = seasonEnd.diff(seasonStart, 'days');

export class App extends Component {
  static propTypes = {
    date: PropTypes.object,
    dateDays: PropTypes.number,
    week: PropTypes.number,
    updateDays: PropTypes.func,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { ...defaultSettings };
    this.state.currentModal = null;
  }

  componentDidMount() {
    /* eslint react/no-did-mount-set-state: 0 */
    const stored = window.localStorage.getItem('iracing-state');
    if (stored) {
      this.setState(JSON.parse(stored));
    }
  }

  componentDidUpdate() {
    const {
      filters, favouriteSeries, favouriteTracks, favouriteCars,
      columns, sort
    } = this.state;

    window.localStorage.setItem('iracing-state', JSON.stringify({
      filters, ownedCars: this.getOwnedCars(), ownedTracks: this.getOwnedTracks(), favouriteSeries, favouriteTracks,
      favouriteCars, columns, sort
    }));
  }

  getOwnedCars() {
    return uniq([
      ...this.state.ownedCars,
      ...defaultSettings.ownedCars
    ]);
  }

  getOwnedTracks() {
    return uniq([
      ...this.state.ownedTracks,
      ...defaultSettings.ownedTracks
    ]);
  }

  updateFilters(newFilters) {
    this.setState({ filters: newFilters });
  }

  resetFilters() {
    this.setState({ filters: { ...defaultFilters } });
  }

  resetSettings() {
    this.setState({ ...defaultSettings });
  }

  closeModal(e = { preventDefault: () => {} }) {
    e.preventDefault();
    this.setState({ currentModal: null });
  }

  openModal(modalName, e = { preventDefault: () => {} }) {
    e.preventDefault();
    this.setState({ currentModal: modalName });
  }

  saveOptions(key, value) {
    this.setState({ [key]: value });
  }

  updateDays(days) {
    this.props.updateDays(days);
  }

  switchLanguage(language) {
    return (e) => {
      e.preventDefault();
      this.props.i18n.changeLanguage(language);
    }
  }

  renderFavouriteSeriesModal() {
    const { favouriteSeries, currentModal } = this.state;
    return (
      <FavouriteSeriesModal
        isOpen={currentModal === 'favourite-series'}
        onClose={this.closeModal.bind(this)}
        favouriteSeries={favouriteSeries}
        save={this.saveOptions.bind(this, 'favouriteSeries')}
      />
    );
  }

  renderMyTracksModal() {
    const { favouriteTracks, currentModal } = this.state;
    const { t } = this.props;
    return (
      <ContentModal
        isOpen={currentModal === 'my-tracks'}
        onClose={this.closeModal.bind(this)}
        title={t('Set my tracks')}
        ownedContent={this.getOwnedTracks()}
        content={tracks}
        idField='id'
        defaultContent={[...defaultSettings.ownedTracks]}
        typeFilter={{ key: 'primaryType', oval: 'oval', road: 'road' }}
        save={this.saveOptions.bind(this, 'ownedTracks')}
        favourites={favouriteTracks}
        saveFavourites={this.saveOptions.bind(this, 'favouriteTracks')}
      />
    );
  }

  renderMyCarsModal() {
    const { favouriteCars, currentModal } = this.state;
    const { t } = this.props;
    return (
      <ContentModal
        isOpen={currentModal === 'my-cars'}
        onClose={this.closeModal.bind(this)}
        title={t('Set my cars')}
        ownedContent={this.getOwnedCars()}
        content={cars}
        idField='sku'
        defaultContent={[...defaultSettings.ownedCars]}
        typeFilter={{ key: 'discountGroupNames', oval: ['oval+car'], road: ['road+car'] }}
        save={this.saveOptions.bind(this, 'ownedCars')}
        favourites={favouriteCars}
        saveFavourites={this.saveOptions.bind(this, 'favouriteCars')}
      />
    );
  }

  renderOptionsModal() {
    const { columns, currentModal } = this.state;
    return (
      <OptionsModal
        isOpen={currentModal === 'options'}
        onClose={this.closeModal.bind(this)}
        columnIds={columns}
        saveOptions={this.saveOptions.bind(this)}
      />
    );
  }

  renderChangelogModal() {
    const { currentModal } = this.state;
    return <AboutModal isOpen={currentModal === 'about'} onClose={this.closeModal.bind(this)} />;
  }

  render() {
    const { filters, favouriteSeries, favouriteCars, favouriteTracks,
      columns, sort } = this.state;

    const { date, dateDays, week, t, i18n } = this.props;

    return (
      <div>
        <nav className='navbar navbar-inverse'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand' href=''>{t('iRacing Week Planner')}</a>
            </div>

            <ul className='nav navbar-nav navbar-right'>
              <li><a href='' onClick={this.openModal.bind(this, 'my-tracks')}>
                {t('Set my tracks')}
              </a></li>
              <li><a href='' onClick={this.openModal.bind(this, 'my-cars')}>
                {t('Set my cars')}
              </a></li>
              <li><a href='' onClick={this.openModal.bind(this, 'favourite-series')}>
                {t('Set favorite series')}
              </a></li>
              <li><a href='' onClick={this.openModal.bind(this, 'options')}>
                {t('Options')}
              </a></li>
              <li><a href='' onClick={this.openModal.bind(this, 'about')}>
                {t('About')}
              </a></li>
              <li className="dropdown">
                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                   aria-expanded="false">{languageFlags[i18n.language]} <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="" onClick={this.switchLanguage('en')}>🇺🇸 English (US)</a></li>
                  <li><a href="" onClick={this.switchLanguage('en-GB')}>🇬🇧 English (UK)</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'>
              <h3>{t('Filters')}</h3>
              <Filters
                currentFilters={filters} updateFilters={this.updateFilters.bind(this)}
                resetSettings={this.resetSettings.bind(this)} resetFilters={this.resetFilters.bind(this)}
              />
            </div>
            <div className='col-md-10'>
              <div className='row'>
                <h3 className='col-xs-8'>
                  {t('Races for date: {{date, YYYY MMM DD}}', { date: date.local().toDate() })}
                </h3>
                <h3 className='col-xs-4' style={{ textAlign: 'right' }}>
                  {t('Week {{week}}', { week })}
                </h3>
              </div>
              <div style={{ marginBottom: 10 }}>
                <Slider
                  min={0}
                  max={seasonLengthDays}
                  value={dateDays}
                  stepSize={1}
                  onChange={this.updateDays.bind(this)}
                  labelRenderer={false}
                />
              </div>
              <RaceListing
                filters={filters} ownedCars={this.getOwnedCars()} ownedTracks={this.getOwnedTracks()}
                favouriteSeries={favouriteSeries} date={date} favouriteTracks={favouriteTracks}
                favouriteCars={favouriteCars} columnIds={columns} sort={sort}
                updateSort={this.saveOptions.bind(this, 'sort')}
              />
            </div>
          </div>
        </div>
        {this.renderMyCarsModal()}
        {this.renderOptionsModal()}
        {this.renderChangelogModal()}
        {this.renderFavouriteSeriesModal()}
        {this.renderMyTracksModal()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  date: state.app.date,
  dateDays: state.app.daysSinceSeasonStart,
  week: state.app.week,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateDays: updateDaysCreator
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(App));
