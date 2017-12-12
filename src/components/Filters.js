import React, { Component, PropTypes } from 'react';
import { cloneDeep } from 'lodash';
import update from 'react-addons-update';
import Checkbox from './Checkbox';

export default class Filters extends Component {
  static propTypes = {
    currentFilters: PropTypes.object,
    updateFilters: PropTypes.func,
    resetSettings: PropTypes.func,
    resetFilters: PropTypes.func
  }

  static defaultProps = {
    currentFilters: {},
    updateFilters: () => {},
    resetSettings: () => {},
    resetFilters: () => {}
  }

  setCheckboxFilter(key, value, e) {
    const { currentFilters, updateFilters } = this.props;
    const newFilters = cloneDeep(currentFilters);
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
    const { currentFilters, resetSettings, resetFilters } = this.props;
    return (
      <div className='filters-component' style={{ fontSize: '0.8em' }}>
        <h4>Type</h4>
        <Checkbox
          checked={currentFilters.type.indexOf('Oval') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'type', 'Oval')}
        >
          Oval
        </Checkbox>
        <Checkbox
          checked={currentFilters.type.indexOf('Road') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'type', 'Road')}
        >
          Road
        </Checkbox>
        <Checkbox
          checked={currentFilters.type.indexOf('Dirt') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'type', 'Dirt')}
        >
          Dirt
        </Checkbox>
        <Checkbox
          checked={currentFilters.type.indexOf('RX') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'type', 'RX')}
        >
          RX
        </Checkbox>

        <h4>Licence</h4>
        <Checkbox
          checked={currentFilters.licence.indexOf('R') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'R')}
        >
          R
        </Checkbox>
        <Checkbox
          checked={currentFilters.licence.indexOf('D') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'D')}
        >
          D
        </Checkbox>
        <Checkbox
          checked={currentFilters.licence.indexOf('C') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'C')}
        >
          C
        </Checkbox>
        <Checkbox
          checked={currentFilters.licence.indexOf('B') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'B')}
        >
          B
        </Checkbox>
        <Checkbox
          checked={currentFilters.licence.indexOf('A') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'A')}
        >
          A
        </Checkbox>
        <Checkbox
          checked={currentFilters.licence.indexOf('P') !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'licence', 'P')}
        >
          P
        </Checkbox>

        <h4>Official/Fixed</h4>
        <Checkbox
          checked={currentFilters.official.indexOf(false) !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'official', false)}
        >
          Unofficial
        </Checkbox>
        <Checkbox
          checked={currentFilters.official.indexOf(true) !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'official', true)}
        >
          Official
        </Checkbox>
        <Checkbox
          checked={currentFilters.fixed.indexOf(false) !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'fixed', false)}
        >
          Open setup
        </Checkbox>
        <Checkbox
          checked={currentFilters.fixed.indexOf(true) !== -1}
          onChange={this.setCheckboxFilter.bind(this, 'fixed', true)}
        >
          Fixed setup
        </Checkbox>

        <h4>Content</h4>
        <Checkbox
          checked={currentFilters.ownedCars === true}
          onChange={this.setBooleanFilter.bind(this, 'ownedCars')}
        >
          Owned cars only
        </Checkbox>
        <Checkbox
          checked={currentFilters.ownedTracks === true}
          onChange={this.setBooleanFilter.bind(this, 'ownedTracks')}
        >
          Owned tracks only
        </Checkbox>
        <Checkbox
          checked={currentFilters.favouriteSeries === true}
          onChange={this.setBooleanFilter.bind(this, 'favouriteSeries')}
        >
          Favorite series only
        </Checkbox>
        <Checkbox
          checked={currentFilters.favouriteCarsOnly === true}
          onChange={this.setBooleanFilter.bind(this, 'favouriteCarsOnly')}
        >
          Favorite cars only
        </Checkbox>
        <Checkbox
          checked={currentFilters.favouriteTracksOnly === true}
          onChange={this.setBooleanFilter.bind(this, 'favouriteTracksOnly')}
        >
          Favorite tracks only
        </Checkbox>

        <p>
          <button type='button' className='btn btn-primary' onClick={resetFilters}>Reset filters</button>
        </p>

        <p>
          <button type='button' className='btn btn-primary' onClick={resetSettings}>Reset all settings</button>
        </p>
      </div>
    );
  }
}
