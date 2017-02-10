import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cloneDeep, uniqBy } from 'lodash';
import { updateDays as updateDaysCreator } from './actions/app';

import RaceListing from './components/RaceListing';
import Filters from './components/Filters';
import FavouriteSeriesModal from './components/modal/FavouriteSeriesModal';
import ContentModal from './components/modal/ContentModal';
import OptionsModal from './components/modal/OptionsModal';
import AboutModal from './components/modal/AboutModal';

import allCars from './data/cars.json';
import tracks from './lib/tracks';
import availableColumns from './data/availableColumns';

import { seasonStart, seasonEnd } from './config';

import { Slider } from '@blueprintjs/core';

import './components/styles/preBootstrap.scss';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '@blueprintjs/core/dist/blueprint.css';

const cars = uniqBy(allCars, (car) => car.sku);

const defaultFilters = {
  type: ['Road', 'Oval'],
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
  columns: availableColumns.filter(column => column.default === true).map(column => column.id),
  mode: 'both'
};

const seasonLengthDays = seasonEnd.diff(seasonStart, 'days');

export class App extends Component {
  static propTypes = {
    date: PropTypes.object,
    dateDays: PropTypes.number,
    dateView: PropTypes.string,
    week: PropTypes.number,
    updateDays: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = cloneDeep(defaultSettings);
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
      filters, ownedCars, ownedTracks, favouriteSeries, favouriteTracks, favouriteCars,
      columns, sort, mode
    } = this.state;

    window.localStorage.setItem('iracing-state', JSON.stringify({
      filters, ownedCars, ownedTracks, favouriteSeries, favouriteTracks, favouriteCars,
      columns, sort, mode
    }));
  }

  updateFilters(newFilters) {
    this.setState({ filters: newFilters });
  }

  resetFilters() {
    this.setState({ filters: cloneDeep(defaultFilters) });
  }

  resetSettings() {
    this.setState(cloneDeep(defaultSettings));
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

  renderFavouriteSeriesModal() {
    const { favouriteSeries, mode, currentModal } = this.state;
    return (
      <FavouriteSeriesModal
        isOpen={currentModal === 'favourite-series'}
        onClose={this.closeModal.bind(this)}
        favouriteSeries={favouriteSeries}
        save={this.saveOptions.bind(this, 'favouriteSeries')}
        oval={mode !== 'road'}
        road={mode !== 'oval'}
      />
    );
  }

  renderMyTracksModal() {
    const { ownedTracks, favouriteTracks, mode, currentModal } = this.state;
    return (
      <ContentModal
        isOpen={currentModal === 'my-tracks'}
        onClose={this.closeModal.bind(this)}
        title='Set My Tracks'
        ownedContent={ownedTracks}
        content={tracks}
        idField='id'
        defaultContent={cloneDeep(defaultSettings.ownedTracks)}
        typeFilter={{ key: 'primaryType', oval: 'oval', road: 'road' }}
        save={this.saveOptions.bind(this, 'ownedTracks')}
        favourites={favouriteTracks}
        saveFavourites={this.saveOptions.bind(this, 'favouriteTracks')}
        oval={mode !== 'road'}
        road={mode !== 'oval'}
      />
    );
  }

  renderMyCarsModal() {
    const { ownedCars, favouriteCars, mode, currentModal } = this.state;
    return (
      <ContentModal
        isOpen={currentModal === 'my-cars'}
        onClose={this.closeModal.bind(this)}
        title='Set My Cars'
        ownedContent={ownedCars}
        content={cars}
        idField='sku'
        defaultContent={cloneDeep(defaultSettings.ownedCars)}
        typeFilter={{ key: 'discountGroupNames', oval: ['oval+car'], road: ['road+car'] }}
        save={this.saveOptions.bind(this, 'ownedCars')}
        favourites={favouriteCars}
        saveFavourites={this.saveOptions.bind(this, 'favouriteCars')}
        oval={mode !== 'road'}
        road={mode !== 'oval'}
      />
    );
  }

  renderOptionsModal() {
    const { columns, mode, currentModal } = this.state;
    return (
      <OptionsModal
        isOpen={currentModal === 'options'}
        onClose={this.closeModal.bind(this)}
        columnIds={columns}
        saveOptions={this.saveOptions.bind(this)}
        mode={mode}
      />
    );
  }

  renderChangelogModal() {
    const { currentModal } = this.state;
    return <AboutModal isOpen={currentModal === 'about'} onClose={this.closeModal.bind(this)} />;
  }

  render() {
    const { filters, favouriteSeries, ownedCars, ownedTracks, favouriteCars, favouriteTracks,
      columns, sort, mode } = this.state;

    const { date, dateDays, dateView, week } = this.props;

    return (
      <div>
        <nav className='navbar navbar-inverse'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand' href=''>iRacing Week Planner</a>
            </div>

            <ul className='nav navbar-nav navbar-right'>
              <li><a href='' onClick={this.openModal.bind(this, 'my-tracks')}>
                Set my tracks
              </a></li>
              <li><a href='' onClick={this.openModal.bind(this, 'my-cars')}>
                Set my cars
              </a></li>
              <li><a href='' onClick={this.openModal.bind(this, 'favourite-series')}>
                Set favorite series
              </a></li>
              <li><a href='' onClick={this.openModal.bind(this, 'options')}>
                Options
              </a></li>
              <li><a href='' onClick={this.openModal.bind(this, 'about')}>
                About
              </a></li>
            </ul>
          </div>
        </nav>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'>
              <h3>Filters</h3>
              <Filters
                currentFilters={filters} updateFilters={this.updateFilters.bind(this)}
                resetSettings={this.resetSettings.bind(this)} resetFilters={this.resetFilters.bind(this)}
                oval={mode !== 'road'} road={mode !== 'oval'}
              />
            </div>
            <div className='col-md-10'>
              <div className='row'>
                <h3 className='col-xs-8'>
                  Races for date: {dateView}
                </h3>
                <h3 className='col-xs-4' style={{ textAlign: 'right' }}>
                  Week {week}
                </h3>
              </div>
              <div style={{ marginBottom: 10 }}>
                <Slider
                  min={0}
                  max={seasonLengthDays}
                  value={dateDays}
                  stepSize={1}
                  onChange={this.updateDays.bind(this)}
                  renderLabel={false}
                />
              </div>
              <RaceListing
                filters={filters} ownedCars={ownedCars} ownedTracks={ownedTracks}
                favouriteSeries={favouriteSeries} date={date} favouriteTracks={favouriteTracks}
                favouriteCars={favouriteCars} columnIds={columns} sort={sort}
                updateSort={this.saveOptions.bind(this, 'sort')}
                oval={mode !== 'road'} road={mode !== 'oval'}
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
  dateView: state.app.dateView,
  week: state.app.week
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateDays: updateDaysCreator
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
