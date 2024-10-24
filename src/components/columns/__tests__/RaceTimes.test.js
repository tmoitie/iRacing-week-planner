import moment from 'moment';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';

import RaceTimes from '../RaceTimes';

describe('components/columns/RaceTimes', () => {
  test('renders no time data', () => {
    render(
      <TableWrapper>
        <RaceTimes
          race={{
            raceTimes: null,
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });

  test('renders settimes', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(
      <TableWrapper>
        <RaceTimes
          race={{
            series: 'Mazda Cup',
            setTimes: [
              moment.duration({ days: 3, hours: 2 }),
              moment.duration({ days: 4, hours: 13 }),
            ],
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();

    await user.click(screen.getByText('Set times'));
    expect(baseElement).toMatchSnapshot();

    await user.click(screen.getByText('Close'));
    expect(baseElement).toMatchSnapshot();
  });

  test('renders everytime', () => {
    render(
      <TableWrapper>
        <RaceTimes
          race={{
            series: 'Mazda Cup',
            everyTime: moment.duration({ hours: 3 }),
            offset: moment.duration({ minutes: 90 }),
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });

  test('renders everytime no offset', () => {
    render(
      <TableWrapper>
        <RaceTimes
          race={{
            series: 'Mazda Cup',
            everyTime: moment.duration({ hours: 3 }),
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });
});
