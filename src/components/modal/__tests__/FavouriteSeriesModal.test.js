import { describe, test } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavouriteSeriesModal from '../FavouriteSeriesModal';

describe('components/modal/FavouriteSeriesModal', () => {
  test('renders closed', async () => {
    const onClose = jest.fn(() => {});
    render(
      <FavouriteSeriesModal isOpen={false} onClose={onClose} favouriteSeries={[]} save={() => {}} />,
    );
    expect(screen.queryByTestId('favouriteSeriesModal')).not.toBeTruthy();
  });

  test('renders with checkbox saving', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn(() => {});
    const save = jest.fn(() => {});
    render(
      <FavouriteSeriesModal isOpen onClose={onClose} favouriteSeries={[245]} save={save} />,
    );
    expect(await screen.findByTestId('favouriteSeriesModal')).toMatchSnapshot();

    await user.click(screen.getByLabelText('13th Week iRacing Figure GR8'));
    expect(save).toHaveBeenCalledWith([]);

    await user.click(screen.getByLabelText('IndyCar iRacing Series'));
    expect(save).toHaveBeenCalledWith([245, 374]);

    await user.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
