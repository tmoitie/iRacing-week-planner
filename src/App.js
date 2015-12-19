import React, { Component, PropTypes } from 'react';
import {cloneDeep, uniq, sortBy} from 'lodash';
import TimeSlider from './components/TimeSlider';
import moment from 'moment';

import RaceListing from './components/RaceListing';
import Filters from './components/Filters';
import FavouriteSeriesModal from './components/modal/FavouriteSeriesModal';
import ContentModal from './components/modal/ContentModal';
import OptionsModal from './components/modal/OptionsModal';
import Modal from './components/modal/Modal';

import allCars from './data/cars.json';
import allTracks from './data/tracks.json';
import availableColumns from './data/availableColumns';

import { seasonStart, seasonEnd } from './config';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

const cars = uniq(allCars, false, (car) => car.sku);
const tracks = sortBy(uniq(sortBy(allTracks, 'priority'), false, 'pkgid'), 'name');

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
  ownedTracks: tracks.filter(track => track.freeWithSubscription === true).map(track => track.pkgid),
  favouriteSeries: [],
  favouriteCars: [],
  favouriteTracks: [],
  columns: availableColumns.filter(column => column.default === true).map(column => column.id)
};

export default class App extends Component {

  static childContextTypes = {
    renderModal: PropTypes.func,
    closeModal: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = cloneDeep(defaultSettings);
    this.state.time = parseInt(moment().hour(11).format('X'), 10);
    this.state.renderCurrentModal = () => null;
  }

  getChildContext() {
    return {
      renderModal: this.renderModal.bind(this),
      closeModal: this.closeModal.bind(this)
    };
  }

  componentDidMount() {
    /* eslint react/no-did-mount-set-state: 0 */
    const stored = window.localStorage.getItem('iracing-state');
    if (stored) {
      this.setState(JSON.parse(stored));
    }
  }

  componentDidUpdate() {
    const {filters, ownedCars, ownedTracks, favouriteSeries, favouriteTracks, favouriteCars, columns} = this.state;
    window.localStorage.setItem('iracing-state', JSON.stringify({
      filters,
      ownedCars,
      ownedTracks,
      favouriteSeries,
      favouriteTracks,
      favouriteCars,
      columns
    }));
  }

  renderModal(renderModal) {
    this.setState({renderCurrentModal: renderModal});
  }

  closeModal() {
    this.setState({renderCurrentModal: () => null});
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

  openFavouriteSeriesModal(e) {
    e.preventDefault();
    this.renderModal(() => {
      const { favouriteSeries } = this.state;
      return (
        <FavouriteSeriesModal onClose={this.closeModal.bind(this)}
          favouriteSeries={favouriteSeries}
          save={this.saveOptions.bind(this, 'favouriteSeries')} />
      );
    });
  }

  openMyTracksModal(e) {
    e.preventDefault();
    this.renderModal(() => {
      const { ownedTracks, favouriteTracks } = this.state;
      return (
        <ContentModal onClose={this.closeModal.bind(this)}
          title='Set My Tracks'
          ownedContent={ownedTracks}
          content={tracks}
          idField='pkgid'
          defaultContent={cloneDeep(defaultSettings.ownedTracks)}
          typeFilter={{key: 'catid', oval: 1, road: 2}}
          save={this.saveOptions.bind(this, 'ownedTracks')}
          favourites={favouriteTracks}
          saveFavourites={this.saveOptions.bind(this, 'favouriteTracks')} />
      );
    });
  }

  openMyCarsModal(e) {
    e.preventDefault();
    this.renderModal(() => {
      const { ownedCars, favouriteCars } = this.state;
      return (
        <ContentModal onClose={this.closeModal.bind(this)}
          title='Set My Cars'
          ownedContent={ownedCars}
          content={cars}
          idField='sku'
          defaultContent={cloneDeep(defaultSettings.ownedCars)}
          typeFilter={{key: 'discountGroupNames', oval: ['oval+car'], road: ['road+car']}}
          save={this.saveOptions.bind(this, 'ownedCars')}
          favourites={favouriteCars}
          saveFavourites={this.saveOptions.bind(this, 'favouriteCars')} />
      );
    });
  }

  openOptionsModal(e) {
    e.preventDefault();
    this.renderModal(() => {
      const { columns } = this.state;
      return (
        <OptionsModal onClose={this.closeModal.bind(this)}
          columnIds={columns}
          saveColumns={this.saveOptions.bind(this, 'columns')} />
      );
    });
  }

  openChangelogModal(e) {
    e.preventDefault();
    this.renderModal(() => (
      <Modal onClose={this.closeModal.bind(this)} title='Changelog'
        doneAction={this.closeModal.bind(this)}>
        <div className='container-fluid'>
          <h3>2015-12-19</h3>
          <ul>
            <li>Make columns selectable</li>
          </ul>
          <h3>2015-12-17</h3>
          <ul>
            <li>Remove P Class series as they have irregular schedules that aren't displaying right.</li>
            <li>Added this changelog!</li>
          </ul>
          <h3>2015-12-16</h3>
          <ul>
            <li>Add ability to 'favorite' content with the star icon.</li>
            <li>Fix bug with disabled default content.</li>
          </ul>
          <h3>2015-12-15</h3>
          <ul>
            <li>Add "Select All Oval/Road" to content choosers.</li>
            <li>Made free content un-unselectable.</li>
            <li>Made series clickable with popup showing all race weeks.</li>
            <li>Add licence class column to table.</li>
          </ul>
        </div>
      </Modal>
    ));
  }

  saveOptions(key, value) {
    this.setState({[key]: value});
  }

  updateTime(time) {
    this.setState({ time: time });
  }

  render() {
    const {filters, favouriteSeries, ownedCars, ownedTracks, time, favouriteCars, favouriteTracks,
      renderCurrentModal, columns} = this.state;
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="">iRacing Week Planner</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a href='' onClick={this.openMyTracksModal.bind(this)}>
                Set my tracks
              </a></li>
              <li><a href='' onClick={this.openMyCarsModal.bind(this)}>
                Set my cars
              </a></li>
              <li><a href='' onClick={this.openFavouriteSeriesModal.bind(this)}>
                Set favorite series
              </a></li>
              <li><a href='' onClick={this.openOptionsModal.bind(this)}>
                Options
              </a></li>
              <li><a href='' onClick={this.openChangelogModal.bind(this)}>
                Changelog
              </a></li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <h3>Filters</h3>
              <Filters currentFilters={filters} updateFilters={this.updateFilters.bind(this)}
                resetSettings={this.resetSettings.bind(this)} resetFilters={this.resetFilters.bind(this)} />
            </div>
            <div className="col-md-10">
              <h3>Races for date: {moment(time, 'X').format('YYYY MMM DD')}</h3>
              <div style={{marginBottom: 10}}>
                <TimeSlider minFrom={seasonStart} maxTo={seasonEnd} onChange={this.updateTime.bind(this)}
                  initial={time} step={moment.duration(1, 'days').asSeconds()} />
              </div>
              <RaceListing filters={filters} ownedCars={ownedCars} ownedTracks={ownedTracks}
                favouriteSeries={favouriteSeries} time={time} favouriteTracks={favouriteTracks}
                favouriteCars={favouriteCars} columnIds={columns} />
            </div>
          </div>
        </div>
        {renderCurrentModal()}
      </div>
    );
  }
}
