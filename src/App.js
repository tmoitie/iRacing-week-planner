import React, { Component } from 'react';
import {cloneDeep, uniq} from 'lodash';
import TimeSlider from './components/TimeSlider';
import moment from 'moment';

import RaceListing from './components/RaceListing';
import Filters from './components/Filters';
import FavouriteSeriesModal from './components/FavouriteSeriesModal';
import OwnedContentModal from './components/OwnedContentModal';

import allCars from './data/cars.json';
import allTracks from './data/tracks.json';

import { seasonStart, seasonEnd } from './config';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

const cars = uniq(allCars, false, (car) => car.sku);
const tracks = uniq(allTracks, false, (track) => track.pkgid);

const defaultFilters = {
  type: ['Road', 'Oval'],
  licence: ['R', 'D', 'C', 'B', 'A', 'P'],
  official: [false, true],
  fixed: [false, true],
  ownedCars: false,
  ownedTracks: false,
  favouriteSeries: false
};

const defaultSettings = {
  filters: defaultFilters,
  ownedCars: cars.filter(car => car.freeWithSubscription === true).map(car => car.sku),
  ownedTracks: tracks.filter(track => track.freeWithSubscription === true).map(track => track.pkgid),
  favouriteSeries: []
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = cloneDeep(defaultSettings);
    this.state.modalOwnedTracks = false;
    this.state.modalOwnedCars = false;
    this.state.modalFavouriteSeries = false;
    this.state.time = parseInt(moment().format('X'), 10);
  }

  componentDidMount() {
    const stored = window.localStorage.getItem('iracing-state');
    if (stored) {
      this.setState(JSON.parse(stored));
    }
  }

  componentDidUpdate() {
    const {filters, ownedCars, ownedTracks, favouriteSeries} = this.state;
    window.localStorage.setItem('iracing-state', JSON.stringify({filters, ownedCars, ownedTracks, favouriteSeries}));
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

  openModalClick(key, e) {
    e.preventDefault();
    this.setState({[key]: true});
  }

  closeModal(key) {
    this.setState({[key]: false});
  }

  saveOptions(key, value) {
    console.log(key, value);
    this.setState({[key]: value});
  }

  updateTime(time) {
    this.setState({ time: time });
  }

  render() {
    const {filters, modalOwnedTracks, modalOwnedCars, modalFavouriteSeries,
      favouriteSeries, ownedCars, ownedTracks, time} = this.state;
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="">iRacing Week Planner</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="" onClick={this.openModalClick.bind(this, 'modalOwnedTracks')}>
                Set owned tracks
              </a></li>
              <li><a href="" onClick={this.openModalClick.bind(this, 'modalOwnedCars')}>
                Set owned cars
              </a></li>
              <li><a href="" onClick={this.openModalClick.bind(this, 'modalFavouriteSeries')}>
                Set favorite series
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
              <h3>Races for date: {moment(time, 'X').format('YYYY-MM-DD')}</h3>
              <TimeSlider minFrom={seasonStart} maxTo={seasonEnd} onChange={this.updateTime.bind(this)}
                initial={time} step={moment.duration(1, 'days').asSeconds()} />
              <RaceListing filters={filters} ownedCars={ownedCars} ownedTracks={ownedTracks}
                favouriteSeries={favouriteSeries} time={time} />
            </div>
          </div>
        </div>
        {modalFavouriteSeries ? (
          <FavouriteSeriesModal onClose={this.closeModal.bind(this, 'modalFavouriteSeries')}
            favouriteSeries={favouriteSeries}
            save={this.saveOptions.bind(this, 'favouriteSeries')} />
        ) : null}
        {modalOwnedCars ? (
          <OwnedContentModal onClose={this.closeModal.bind(this, 'modalOwnedCars')}
            ownedContent={ownedCars}
            content={cars}
            idField='sku'
            save={this.saveOptions.bind(this, 'ownedCars')} />
        ) : null}
        {modalOwnedTracks ? (
          <OwnedContentModal onClose={this.closeModal.bind(this, 'modalOwnedTracks')}
            ownedContent={ownedTracks}
            content={tracks}
            idField='pkgid'
            save={this.saveOptions.bind(this, 'ownedTracks')} />
        ) : null}
      </div>
    );
  }
}
