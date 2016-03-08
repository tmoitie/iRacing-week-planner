import React, { Component, PropTypes } from 'react';
import {cloneDeep, uniqBy, sortBy} from 'lodash';
import TimeSlider from './components/TimeSlider';
import moment, {duration} from 'moment';

import RaceListing from './components/RaceListing';
import Filters from './components/Filters';
import FavouriteSeriesModal from './components/modal/FavouriteSeriesModal';
import ContentModal from './components/modal/ContentModal';
import OptionsModal from './components/modal/OptionsModal';
import Modal from './components/modal/Modal';

import allCars from './data/cars.json';
import tracks from './lib/tracks';
import availableColumns from './data/availableColumns';

import { seasonStart, seasonEnd } from './config';

import changelog from './data/changelog';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

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
  sort: {key: 'licence', order: 'asc'},
  columns: availableColumns.filter(column => column.default === true).map(column => column.id),
  mode: 'both'
};

export default class App extends Component {

  static childContextTypes = {
    renderModal: PropTypes.func,
    closeModal: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = cloneDeep(defaultSettings);
    this.state.date = moment().utc().startOf('day');
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
    const {
      filters, ownedCars, ownedTracks, favouriteSeries, favouriteTracks, favouriteCars,
      columns, sort, mode
    } = this.state;

    window.localStorage.setItem('iracing-state', JSON.stringify({
      filters, ownedCars, ownedTracks, favouriteSeries, favouriteTracks, favouriteCars,
      columns, sort, mode
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
      const { favouriteSeries, mode } = this.state;
      return (
        <FavouriteSeriesModal onClose={this.closeModal.bind(this)}
          favouriteSeries={favouriteSeries}
          save={this.saveOptions.bind(this, 'favouriteSeries')}
          oval={mode !== 'road'}
          road={mode !== 'oval'} />
      );
    });
  }

  openMyTracksModal(e) {
    e.preventDefault();
    this.renderModal(() => {
      const { ownedTracks, favouriteTracks, mode } = this.state;
      return (
        <ContentModal onClose={this.closeModal.bind(this)}
          title='Set My Tracks'
          ownedContent={ownedTracks}
          content={tracks}
          idField='id'
          defaultContent={cloneDeep(defaultSettings.ownedTracks)}
          typeFilter={{key: 'primaryType', oval: 'oval', road: 'road'}}
          save={this.saveOptions.bind(this, 'ownedTracks')}
          favourites={favouriteTracks}
          saveFavourites={this.saveOptions.bind(this, 'favouriteTracks')}
          oval={mode !== 'road'}
          road={mode !== 'oval'} />
      );
    });
  }

  openMyCarsModal(e) {
    e.preventDefault();
    this.renderModal(() => {
      const { ownedCars, favouriteCars, mode } = this.state;
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
          saveFavourites={this.saveOptions.bind(this, 'favouriteCars')}
          oval={mode !== 'road'}
          road={mode !== 'oval'} />
      );
    });
  }

  openOptionsModal(e) {
    e.preventDefault();
    this.renderModal(() => {
      const { columns, mode } = this.state;
      return (
        <OptionsModal onClose={this.closeModal.bind(this)}
          columnIds={columns}
          saveOptions={this.saveOptions.bind(this)}
          mode={mode} />
      );
    });
  }

  openChangelogModal(e) {
    e.preventDefault();
    this.renderModal(() => (
      <Modal onClose={this.closeModal.bind(this)} title='About'
        doneAction={this.closeModal.bind(this)}>
        <div className='container-fluid'>

          <p>
            <span>This tool was created by <a href='https://twitter.com/tmoitie' target='_blank'>@tmoitie</a> (</span>
            <a href='http://members.iracing.com/membersite/member/CareerStats.do?custid=69636'
              target='_blank'>Tom Moitié</a>
            <span> on iRacing). Feel free to contact me via twitter or iRacing if you have any feedback or </span>
            <span>questions. The code is hosted publicly on </span>
            <a href='https://github.com/tmoitie/iRacing-week-planner' target='_blank'>Github</a>
            <span>. Thanks!</span>
          </p>

          <h3>Changelog</h3>
          {changelog.map(dayItem => {
            return (
              <div key={dayItem.date}>
                <h4>{dayItem.date.local().format('YYYY MMM DD')}</h4>
                <ul>
                  {dayItem.items.map((changeItem, index) => <li key={index}>{changeItem}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </Modal>
    ));
  }

  saveOptions(key, value) {
    this.setState({[key]: value});
  }

  updateDate(date) {
    this.setState({ date: moment(date, 'X') });
  }

  render() {
    const {filters, favouriteSeries, ownedCars, ownedTracks, date, favouriteCars, favouriteTracks,
      renderCurrentModal, columns, sort, mode} = this.state;
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
                About
              </a></li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <h3>Filters</h3>
              <Filters currentFilters={filters} updateFilters={this.updateFilters.bind(this)}
                resetSettings={this.resetSettings.bind(this)} resetFilters={this.resetFilters.bind(this)}
                oval={mode !== 'road'} road={mode !== 'oval'} />
            </div>
            <div className="col-md-10">
              <h3>Races for date: {moment(date).local().format('YYYY MMM DD')}</h3>
              <div style={{marginBottom: 10}}>
                <TimeSlider minFrom={parseInt(seasonStart.format('X'), 10)} maxTo={parseInt(seasonEnd.format('X'), 10)}
                  onChange={this.updateDate.bind(this)} initial={parseInt(date.format('X'), 10)}
                  step={duration(1, 'days').asSeconds()} />
              </div>
              <RaceListing filters={filters} ownedCars={ownedCars} ownedTracks={ownedTracks}
                favouriteSeries={favouriteSeries} date={date} favouriteTracks={favouriteTracks}
                favouriteCars={favouriteCars} columnIds={columns} sort={sort}
                updateSort={this.saveOptions.bind(this, 'sort')}
                oval={mode !== 'road'} road={mode !== 'oval'} />
            </div>
          </div>
        </div>
        {renderCurrentModal()}
      </div>
    );
  }
}
