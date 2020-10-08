import MockDate from 'mockdate';
import moment from 'moment';
import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';
import { getNextRace } from '../../../lib/races';

import NextRace from '../NextRace';

jest.mock(
  '../../../lib/races',
  () => ({
    getNextRace: jest.fn(),
  }),
);

describe('components/columns/NextRace', () => {
  test('renders correctly', () => {
    MockDate.set('2020-09-23T13:30:00.000Z');
    getNextRace.mockReturnValue(moment('2020-09-23T13:45:00.000Z'));
    const component = shallow(<NextRace race={{}} />);

    expect(component).toMatchSnapshot();
    MockDate.reset();
  });
});
