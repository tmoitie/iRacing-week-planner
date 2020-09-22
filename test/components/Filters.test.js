import { describe, test } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import ConnectedFilters, { Filters } from '../../src/components/Filters';
import { defaultFilters } from '../../src/reducers/settings'

const mockStore = configureMockStore();

describe('components/Filters', () => {
  const updateFilters = jest.fn();
  const resetSettings = jest.fn();
  const resetFilters = jest.fn();
  const t = jest.fn((key) => key);

  test('renders correctly', () => {
    const component = shallow(<Filters
      currentFilters={defaultFilters}
      updateFilters={updateFilters}
      resetSettings={resetSettings}
      resetFilters={resetFilters}
      t={t}
    />);

    expect(component).toMatchSnapshot();
  });

  test('correctly click a filter item checkbox', () => {
    const component = shallow(<Filters
      currentFilters={{ ...defaultFilters, type: ['Oval', 'Road'] }}
      updateFilters={updateFilters}
      resetSettings={resetSettings}
      resetFilters={resetFilters}
      t={t}
    />);

    const ovalCheckbox = component.find({ id: 'checkbox-type-oval' });

    ovalCheckbox.first().invoke('onChange')(false);

    expect(updateFilters).toHaveBeenCalledWith(expect.objectContaining({
      type: ['Road']
    }));

    updateFilters.mockClear();

    const rxCheckbox = component.find({ id: 'checkbox-type-rx' });

    rxCheckbox.first().invoke('onChange')(true);

    expect(updateFilters).toHaveBeenCalledWith(expect.objectContaining({
      type: ['Oval', 'Road', 'RX']
    }));

    expect(component).toMatchSnapshot();
  });

  test('correctly click a true/false checkbox', () => {
    const component = shallow(<Filters
      currentFilters={{ ...defaultFilters, ownedTracks: true }}
      updateFilters={updateFilters}
      resetSettings={resetSettings}
      resetFilters={resetFilters}
      t={t}
    />);

    const ownedTracksCheckbox = component.find({ id: 'checkbox-ownedTracks' });

    ownedTracksCheckbox.first().invoke('onChange')(false);

    expect(updateFilters).toHaveBeenCalledWith(expect.objectContaining({
      ownedTracks: false,
    }));

    updateFilters.mockClear();

    const favouriteSeriesCheckbox = component.find({ id: 'checkbox-favouriteSeries' });

    favouriteSeriesCheckbox.first().invoke('onChange')(true);

    expect(updateFilters).toHaveBeenCalledWith(expect.objectContaining({
      favouriteSeries: true,
    }));

    expect(component).toMatchSnapshot();
  });

  test('not synced user', () => {
    const component = shallow(<Filters
      currentFilters={defaultFilters}
      updateFilters={updateFilters}
      resetSettings={resetSettings}
      resetFilters={resetFilters}
      t={t}
      user={{ id: 12 }}
      firebaseSynced={false}
    />);

    expect(component).toMatchSnapshot();
  });

  test('synced user', () => {
    const component = shallow(<Filters
      currentFilters={defaultFilters}
      updateFilters={updateFilters}
      resetSettings={resetSettings}
      resetFilters={resetFilters}
      t={t}
      user={{ id: 12 }}
      firebaseSynced
    />);

    expect(component).toMatchSnapshot();
  });

  test('buttons fire events', () => {
    const component = shallow(<Filters
      currentFilters={defaultFilters}
      updateFilters={updateFilters}
      resetSettings={resetSettings}
      resetFilters={resetFilters}
      t={t}
      user={{ id: 12 }}
      firebaseSynced
    />);
    component.find({ id: 'filters-reset-filters-button' }).first().simulate('click');
    expect(resetFilters).toBeCalled();

    component.find({ id: 'filters-reset-settings-button' }).first().simulate('click');
    expect(resetSettings).toBeCalled();
  });

  test('passes redux props', () => {
    const store = mockStore({
      settings: { filters: defaultFilters, firebaseSynced: true },
      auth: { user: null },
    });
    const component = shallow(<ConnectedFilters store={store} />);
    expect(component.children().first().prop('currentFilters')).toBe(defaultFilters);
    expect(component.children().first().prop('user')).toBe(null);
    expect(component.children().first().prop('firebaseSynced')).toBe(true);
  });
});
