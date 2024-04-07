import { describe, test } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockDate from 'mockdate';
import SeriesModal from '../SeriesModal';
import '../../../data/offWeeks';

jest.mock('firebase/auth');
jest.mock('../../../data/offWeeks');

describe('components/modal/SeriesModal', () => {
  test('renders closed', async () => {
    const onClose = jest.fn(() => {});
    const { baseElement } = render(
      <SeriesModal isOpen={false} onClose={onClose} ownedTracks={[]} ownedCars={[]} seasonId={2500} seriesId={245} />,
    );

    expect(screen.queryByTestId('modal-series-245-2500')).not.toBeTruthy();
  });

  test('renders open', async () => {
    const user = userEvent.setup();

    MockDate.set('2022-09-07T13:30:00.000Z');
    const onClose = jest.fn(() => {});

    const { baseElement } = render(
      <SeriesModal isOpen onClose={onClose} ownedTracks={[6]} ownedCars={[]} seasonId={2500} seriesId={245} />,
    );

    expect(await screen.findByTestId('modal-series-245-2500')).toMatchSnapshot();

    await user.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  test('renders with cars', async () => {
    MockDate.set('2022-09-07T13:30:00.000Z');
    const onClose = jest.fn(() => {});
    const { baseElement } = render(
      <SeriesModal isOpen onClose={onClose} ownedTracks={[6]} ownedCars={[]} seasonId={2550} seriesId={245} />,
    );

    expect(await screen.findByTestId('modal-series-245-2550')).toMatchSnapshot();
  });
});
