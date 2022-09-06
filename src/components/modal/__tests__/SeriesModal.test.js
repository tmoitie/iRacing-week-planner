import { describe, test } from '@jest/globals';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import MockDate from 'mockdate';
import SeriesModal from '../SeriesModal';

jest.mock('firebase/auth');

describe('components/modal/SeriesModal', () => {
  test('renders closed', async () => {
    const onClose = jest.fn(() => {});
    const component = renderer.create(
      <SeriesModal isOpen={false} onClose={onClose} ownedTracks={[]} seriesId={245} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders open', async () => {
    MockDate.set('2022-09-07T13:30:00.000Z');
    const onClose = jest.fn(() => {});
    let component;
    act(() => {
      component = renderer.create(
        <SeriesModal isOpen onClose={onClose} ownedTracks={[6]} seriesId={245} />,
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
