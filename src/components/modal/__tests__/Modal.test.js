import { describe, test } from '@jest/globals';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Modal from '../Modal';

describe('components/modal/Modal', () => {
  test('renders closed', async () => {
    const component = renderer.create(
      <Modal isOpen={false} onClose={() => {}} title="Test Closed">
        <div>Hello Closed!</div>
      </Modal>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders no footer', async () => {
    const component = renderer.create(
      <Modal isOpen onClose={() => {}} title="Test No Footer" showFooter={false}>
        <div>No Footer!</div>
      </Modal>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders open', async () => {
    const onClose = jest.fn(() => {});
    const doneAction = jest.fn(() => {});
    let component;

    const clickEvent = { preventDefault: () => {}, stopPropagation: () => {} };

    act(() => {
      component = renderer.create(
        <Modal
          isOpen
          onClose={onClose}
          title="Test Open"
          doneButtonText="Is Done"
          doneAction={doneAction}
          id="testOpen"
        >
          <div>Hello Open!</div>
        </Modal>,
      );
    });

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root
        .findByProps({ 'aria-label': 'Close' })
        .props.onClick(clickEvent);
    });

    expect(onClose).toHaveBeenCalled();

    await act(async () => {
      await component.root
        .findByProps({ children: 'Is Done' })
        .props.onClick(clickEvent);
    });

    expect(doneAction).toHaveBeenCalled();
  });

  test('presses escape', async () => {
    const onClose = jest.fn(() => {});
    let component;
    act(() => {
      component = renderer.create(
        <Modal isOpen onClose={onClose} title="Test Escape" />,
      );
    });

    document.dispatchEvent(new KeyboardEvent('keypress', { code: 'KeyR', key: 82, keyCode: 82 }));
    expect(onClose).not.toHaveBeenCalled();

    document.dispatchEvent(new KeyboardEvent('keypress', { code: 'Escape', key: 27, keyCode: 27 }));
    expect(onClose).toHaveBeenCalledTimes(1);

    // Backwards compatibility
    document.dispatchEvent(new KeyboardEvent('keypress', { keyCode: 27 }));
    expect(onClose).toHaveBeenCalledTimes(2);

    act(() => {
      component.unmount();
    });

    document.dispatchEvent(new KeyboardEvent('keypress', { code: 'Escape', key: 27, keyCode: 27 }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  test('default actions don\'t crash', async () => {
    let component;

    const clickEvent = { preventDefault: () => {}, stopPropagation: () => {} };

    act(() => { component = renderer.create(<Modal isOpen title="Test Open" doneButtonText="OK" />); });

    await act(async () => {
      await component.root.findByProps({ 'aria-label': 'Close' }).props.onClick(clickEvent);
    });

    await act(async () => {
      await component.root.findByProps({ children: 'OK' }).props.onClick(clickEvent);
    });
  });
});
