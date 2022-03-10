import { describe, test } from '@jest/globals';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import SeriesModal from '../SeriesModal';

jest.mock('firebase/auth');

describe('components/modal/SeriesModal', () => {
  test('renders closed', async () => {
    const onClose = jest.fn(() => {});
    const component = renderer.create(
      <SeriesModal isOpen={false} onClose={onClose} ownedTracks={[]} seriesId={139} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders open', async () => {
    const onClose = jest.fn(() => {});
    let component;
    act(() => {
      component = renderer.create(
        <SeriesModal isOpen onClose={onClose} ownedTracks={[304, 13]} seriesId={139} />,
      );
    });

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root.findByProps({ 'aria-label': 'Close' }).props.onClick({
        preventDefault: () => {},
        stopPropagation: () => {},
      });
    });

    expect(onClose).toHaveBeenCalled();
  });
});
