import { describe, test } from '@jest/globals';
import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CarModal from '../CarModal';

import '../../../data/cars.json';

jest.mock('../../../data/cars.json');

describe('components/modal/CarModal', () => {
  test('renders correctly', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <CarModal
        onClose={onClose}
        ownedCars={[10494, 10410]}
        favouriteCars={[10461, 10410]}
        isOpen
        carIds={[10410, 10494, 10461, 10405]}
        seriesName="Audi Spectacular"
        seriesId={123}
      />,
    );

    expect(await screen.findByTestId('modal-cars-123')).toMatchSnapshot();

    await user.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
