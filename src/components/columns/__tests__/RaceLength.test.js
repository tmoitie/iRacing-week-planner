import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';
import RaceLength from '../RaceLength';

describe('components/columns/RaceLength', () => {
  test('renders null', () => {
    render(
      <TableWrapper>
        <RaceLength
          race={{
            raceLength: null,
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });

  test('renders laps', () => {
    render(
      <TableWrapper>
        <RaceLength
          race={{
            raceLength: {
              laps: 45,
            },
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });

  test('renders hours', () => {
    render(
      <TableWrapper>
        <RaceLength
          race={{
            raceLength: {
              minutes: 120,
            },
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });

  test('renders minutes', () => {
    render(
      <TableWrapper>
        <RaceLength
          race={{
            raceLength: {
              minutes: 45,
            },
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });

  test('renders empty object mistake', () => {
    render(
      <TableWrapper>
        <RaceLength
          race={{
            raceLength: {},
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });
});
