import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import { TableWrapper } from './ColumnUtils';

import Series from '../Series';

describe('components/columns/Series', () => {
  test('renders correctly', async () => {
    const user = userEvent.setup();

    const { container, baseElement, unmount } = render(
      <TableWrapper>
        <Series
          race={{
            seriesId: 374,
            seasonId: 3598,
            series: 'IndyCar iRacing Series',
          }}
          favouriteSeries={[123, 763]}
          ownedTracks={[]}
          ownedCars={[]}
        />
      </TableWrapper>,
    );

    expect(baseElement).toMatchSnapshot();

    await user.click(screen.getByText('IndyCar iRacing Series'));
    await screen.findByText('Close');
    expect(baseElement).toMatchSnapshot();

    await user.click(screen.getByText('Close'));
    expect(baseElement).toMatchSnapshot();

    unmount();
  });

  test('renders favourite series', () => {
    render(
      <TableWrapper>
        <Series
          race={{
            seriesId: 345,
            seasonId: 3450,
            series: 'Rallycross',
          }}
          favouriteSeries={[345, 567]}
          ownedTracks={[123]}
          ownedCars={[]}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });
});
