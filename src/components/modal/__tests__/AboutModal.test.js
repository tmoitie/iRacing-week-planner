import { describe, test } from '@jest/globals';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import AboutModal from '../AboutModal';

jest.mock('firebase/auth');

describe('components/modal/AboutModal', () => {
  test('renders closed', async () => {
    const onClose = jest.fn(() => {});
    const component = renderer.create(
      <AboutModal isOpen={false} onClose={onClose} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders open', async () => {
    const onClose = jest.fn(() => {});
    let component;

    act(() => { component = renderer.create(<AboutModal isOpen onClose={onClose} />); });
    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root
        .findByProps({ 'aria-label': 'Close' })
        .props.onClick({ preventDefault: () => {}, stopPropagation: () => {} });
    });

    expect(onClose).toHaveBeenCalled();
  });
});
