import React from 'react';
import renderer from 'react-test-renderer';
import { describe, test } from '@jest/globals';

import RaceLength from '../RaceLength';

describe('components/columns/RaceLength', () => {
  test('renders null', () => {
    const component = renderer.create(
      <RaceLength
        race={{
          raceLength: null
        }}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders laps', () => {
    const component = renderer.create(
      <RaceLength
        race={{
          raceLength: {
            laps: 45,
          }
        }}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders hours', () => {
    const component = renderer.create(
      <RaceLength
        race={{
          raceLength: {
            minutes: 120,
          }
        }}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders minutes', () => {
    const component = renderer.create(
      <RaceLength
        race={{
          raceLength: {
            minutes: 45,
          }
        }}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
