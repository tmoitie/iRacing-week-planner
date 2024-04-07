import MockDate from 'mockdate';
import moment from 'moment';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';
import '@testing-library/jest-dom';
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
    MockDate.set('2022-09-07T13:30:00.000Z');
    getNextRace.mockReturnValue(moment('2022-09-07T13:45:00.000Z'));
    render(<TableWrapper><NextRace race={{}} /></TableWrapper>);

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    MockDate.reset();
  });

  test('renders no time data', () => {
    MockDate.set('2022-09-07T13:30:00.000Z');
    getNextRace.mockReturnValue(null);
    render(<TableWrapper><NextRace race={{}} /></TableWrapper>);

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    MockDate.reset();
  });
});
