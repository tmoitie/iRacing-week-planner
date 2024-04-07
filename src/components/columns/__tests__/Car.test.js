import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import { TableWrapper } from './ColumnUtils';

import Car from '../Car';

describe('components/columns/Car', () => {
  test('renders correctly', () => {
    render(
      <TableWrapper>
        <Car
          race={{
            carIds: [4, 5],
            carClasses: ['Mazda Cup'],
            series: 'Mazda Cup',
          }}
          favouriteCars={[]}
          ownedCars={[]}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });

  test('renders owned, favourite', () => {
    render(
      <TableWrapper>
        <Car
          race={{
            carIds: [4, 5],
            carClasses: ['Mazda Cup'],
            series: 'Mazda Cup',
          }}
          favouriteCars={[4]}
          ownedCars={[5]}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });

  test('opens modal', async () => {
    const user = userEvent.setup();

    const { baseElement, unmount } = render(
      <TableWrapper>
        <Car
          race={{
            carIds: [4, 5],
            carClasses: ['Mazda Cup'],
            series: 'Mazda Cup',
            seriesId: 105,
          }}
          favouriteCars={[4]}
          ownedCars={[5]}
        />
      </TableWrapper>,
    );

    await user.click(screen.getByText('Mazda Cup'));
    expect(baseElement).toMatchSnapshot();

    await user.click(screen.getByText('Close'));
    expect(baseElement).toMatchSnapshot();

    unmount();
  });
});
