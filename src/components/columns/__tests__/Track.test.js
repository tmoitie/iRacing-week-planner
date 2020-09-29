import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import { Track } from '../index';

describe('components/columns/Track', () => {
  test('renders no own or fave', () => {
    const component = shallow(
      <Track
        race={{
          trackId: 125,
        }}
        ownedTracks={[]}
        favouriteTracks={[]}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('.success').length).toBe(0);
    expect(component.find('.glyphicon-star').length).toBe(0);
  });

  test('renders ownership', () => {
    const component = shallow(
      <Track
        race={{
          trackId: 125,
        }}
        ownedTracks={[125]}
        favouriteTracks={[]}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('.success').length).toBe(1);
    expect(component.find('.glyphicon-star').length).toBe(0);
  });

  test('renders favourite', () => {
    const component = shallow(
      <Track
        race={{
          trackId: 125,
        }}
        ownedTracks={[]}
        favouriteTracks={[125]}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('.success').length).toBe(0);
    expect(component.find('.glyphicon-star').length).toBe(1);
  });
});
