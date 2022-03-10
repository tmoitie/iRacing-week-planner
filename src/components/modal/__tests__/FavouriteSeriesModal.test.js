import { describe, test } from '@jest/globals';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import FavouriteSeriesModal from '../FavouriteSeriesModal';

jest.mock('firebase/auth');

describe('components/modal/FavouriteSeriesModal', () => {
  test('renders closed', async () => {
    const onClose = jest.fn(() => {});
    const component = renderer.create(
      <FavouriteSeriesModal isOpen={false} onClose={onClose} favouriteSeries={[]} save={() => {}} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with checkbox saving', async () => {
    const onClose = jest.fn(() => {});
    const save = jest.fn(() => {});
    let component;
    act(() => {
      component = renderer.create(
        <FavouriteSeriesModal isOpen onClose={onClose} favouriteSeries={[139]} save={save} />,
      );
    });

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root.findByProps({ id: 'favourite-series-139' }).props.onChange(false);
    });

    expect(save).toHaveBeenCalledWith([]);

    await act(async () => {
      await component.root.findByProps({ id: 'favourite-series-432' }).props.onChange(true);
    });

    expect(save).toHaveBeenCalledWith([139, 432]);

    await act(async () => {
      await component.root.findByProps({ 'aria-label': 'Close' }).props.onClick({
        preventDefault: () => {},
        stopPropagation: () => {},
      });
    });

    expect(onClose).toHaveBeenCalled();
  });
});
