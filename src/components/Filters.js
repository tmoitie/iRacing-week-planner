import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDays as updateDaysCreator } from '../actions/app';
import { signOut, startListener } from '../actions/auth';
import { resetFilters, resetSettings, updateFilters } from '../actions/settings';
import Checkbox from './Checkbox';

export class Filters extends Component {
  static propTypes = {
    currentFilters: PropTypes.object.isRequired,
    updateFilters: PropTypes.func.isRequired,
    resetSettings: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    user: PropTypes.object,
    firebaseSynced: PropTypes.bool.isRequired,
  }

  setCheckboxFilter(key, value, e) {
    const { currentFilters, updateFilters } = this.props;
    const newFilters = { ...currentFilters };
    if (typeof newFilters[key] !== 'object') {
      newFilters[key] = [];
    }

    const index = newFilters[key].indexOf(value);

    if (index === -1 && e.target.checked) {
      newFilters[key].push(value);
    }
    if (index !== -1 && e.target.checked === false) {
      newFilters[key].splice(index, 1);
    }
    updateFilters(newFilters);
  }

  setBooleanFilter(key, e) {
    const { currentFilters, updateFilters } = this.props;
    updateFilters(update(currentFilters, {
      [key]: { $set: e.target.checked }
    }));
  }

  render() {
    const { currentFilters, resetSettings, resetFilters, t, user, firebaseSynced } = this.props;
    return (
      <div className='filters-component' style={{ fontSize: '0.8em' }}>
        <h4>{t('Type')}</h4>
        <Checkbox
          checked={currentFilters.type.indexOf('Oval') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'type', 'Oval')}
        >
          {t('Oval')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.type.indexOf('Road') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'type', 'Road')}
        >
          {t('Road')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.type.indexOf('Dirt') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'type', 'Dirt')}
        >
          {t('Dirt')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.type.indexOf('RX') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'type', 'RX')}
        >
          {t('RX')}
        </Checkbox>

        <h4>{t('Licence')}</h4>
        <Checkbox
          checked={currentFilters.licence.indexOf('R') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'R')}
        >
          {t('R')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.licence.indexOf('D') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'D')}
        >
          {t('D')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.licence.indexOf('C') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'C')}
        >
          {t('C')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.licence.indexOf('B') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'B')}
        >
          {t('B')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.licence.indexOf('A') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'A')}
        >
          {t('A')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.licence.indexOf('P') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'P')}
        >
          {t('P')}
        </Checkbox>

        <h4>{t('Official/Fixed')}</h4>
        <Checkbox
          checked={currentFilters.official.indexOf(false) !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'official', false)}
        >
          {t('Unofficial')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.official.indexOf(true) !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'official', true)}
        >
          {t('Official')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.fixed.indexOf(false) !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'fixed', false)}
        >
          {t('Open setup')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.fixed.indexOf(true) !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'fixed', true)}
        >
          {t('Fixed setup')}
        </Checkbox>

        <h4>{t('Content')}</h4>
        <Checkbox
          checked={currentFilters.ownedCars === true}
          onChange={this.setBooleanFilter.bind(this, 'ownedCars')}
        >
          {t('Owned cars only')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.ownedTracks === true}
          onChange={this.setBooleanFilter.bind(this, 'ownedTracks')}
        >
          {t('Owned tracks only')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.favouriteSeries === true}
          onChange={this.setBooleanFilter.bind(this, 'favouriteSeries')}
        >
          {t('Favorite series only')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.favouriteCarsOnly === true}
          onChange={this.setBooleanFilter.bind(this, 'favouriteCarsOnly')}
        >
          {t('Favorite cars only')}
        </Checkbox>
        <Checkbox
          checked={currentFilters.favouriteTracksOnly === true}
          onChange={this.setBooleanFilter.bind(this, 'favouriteTracksOnly')}
        >
          {t('Favorite tracks only')}
        </Checkbox>

        <p>
          <button type='button' className='btn btn-primary' onClick={resetFilters}>
            {t('Reset filters')}
          </button>
        </p>

        <p>
          <button type='button' className='btn btn-primary' onClick={resetSettings}>
            {t('Reset all settings')}
          </button>
        </p>

        {user ? (<p>
          <span>{firebaseSynced ? t('Synced') : t('Awaiting sync')} {t('(refresh browser to download latest)')}</span>
        </p>) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentFilters: state.settings.filters,
  user: state.auth.user,
  firebaseSynced: state.settings.firebaseSynced,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateFilters,
  resetFilters,
  resetSettings,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Filters));

