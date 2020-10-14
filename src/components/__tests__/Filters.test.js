import { describe, test } from '@jest/globals';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RESET_FILTERS, RESET_SETTINGS, UPDATE_FILTERS } from '../../actions/settings';

import { defaultFilters } from '../../reducers/settings';
import Filters from '../Filters';

const mockStore = configureMockStore([thunk]);

describe('components/Filters', () => {
  test('renders correctly', () => {
    const store = mockStore({
      settings: { filters: defaultFilters, firebaseSynced: false },
      auth: { user: null },
    });

    const component = renderer.create(<Provider store={store}><Filters /></Provider>);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('correctly click a filter item checkbox', () => {
    const filters = { ...defaultFilters, type: ['Oval', 'Road'] };
    const store = mockStore({
      settings: { filters, firebaseSynced: false },
      auth: { user: null },
    });

    const component = renderer.create(<Provider store={store}><Filters /></Provider>);

    const ovalCheckbox = component.root.findByProps({ id: 'checkbox-type-oval' });

    ovalCheckbox.props.onChange(false);

    expect(store.getActions()[0]).toEqual(expect.objectContaining({
      type: UPDATE_FILTERS,
      payload: expect.objectContaining({ filters: expect.objectContaining({ type: ['Road'] }) }),
    }));

    const rxCheckbox = component.root.findByProps({ id: 'checkbox-type-rx' });

    rxCheckbox.props.onChange(true);

    expect(store.getActions()[1]).toEqual(expect.objectContaining({
      type: UPDATE_FILTERS,
      payload: expect.objectContaining({
        filters: expect.objectContaining({ type: ['Oval', 'Road', 'RX'] }),
      }),
    }));

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('correctly click a true/false checkbox', () => {
    const filters = { ...defaultFilters, ownedTracks: true };
    const store = mockStore({
      settings: { filters, firebaseSynced: false },
      auth: { user: null },
    });

    const component = renderer.create(<Provider store={store}><Filters /></Provider>);

    const ownedTracksCheckbox = component.root.findByProps({ id: 'checkbox-ownedTracks' });

    ownedTracksCheckbox.props.onChange(false);

    expect(store.getActions()[0]).toEqual(expect.objectContaining({
      type: UPDATE_FILTERS,
      payload: expect.objectContaining({
        filters: expect.objectContaining({ ownedTracks: false }),
      }),
    }));

    const favouriteSeriesCheckbox = component.root.findByProps({ id: 'checkbox-favouriteSeries' });

    favouriteSeriesCheckbox.props.onChange(true);

    expect(store.getActions()[1]).toEqual(expect.objectContaining({
      type: UPDATE_FILTERS,
      payload: expect.objectContaining({
        filters: expect.objectContaining({ ownedTracks: true }),
      }),
    }));

    expect(component).toMatchSnapshot();
  });

  test('not synced user', () => {
    const store = mockStore({
      settings: { filters: defaultFilters, firebaseSynced: false },
      auth: { user: { id: 12 } },
    });

    const component = renderer.create(<Provider store={store}><Filters /></Provider>);

    expect(component).toMatchSnapshot();
  });

  test('synced user', () => {
    const store = mockStore({
      settings: { filters: defaultFilters, firebaseSynced: true },
      auth: { user: { id: 12 } },
    });

    const component = renderer.create(<Provider store={store}><Filters /></Provider>);

    expect(component).toMatchSnapshot();
  });

  test('buttons fire events', () => {
    const store = mockStore({
      settings: { filters: defaultFilters, firebaseSynced: false },
      auth: { user: null },
    });
    const component = renderer.create(<Provider store={store}><Filters /></Provider>);

    const resetFiltersButton = component.root.findByProps({ id: 'filters-reset-filters-button' });
    resetFiltersButton.props.onClick();

    expect(store.getActions()[0].type).toEqual(RESET_FILTERS);

    const resetSettingsButton = component.root.findByProps({ id: 'filters-reset-settings-button' });
    resetSettingsButton.props.onClick();

    expect(store.getActions()[1].type).toEqual(RESET_SETTINGS);
  });
});
