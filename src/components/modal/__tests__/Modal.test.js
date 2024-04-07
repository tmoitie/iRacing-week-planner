import { describe, test } from '@jest/globals';
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../Modal';

describe('components/modal/Modal', () => {
  test('renders closed', async () => {
    const { baseElement } = render(
      <Modal isOpen={false} onClose={() => {}} title="Test Closed" id="testClosed">
        <div>Hello Closed!</div>
      </Modal>,
    );

    expect(screen.queryByTestId('testClosed')).not.toBeTruthy();
  });

  test('renders no footer', async () => {
    const { baseElement } = render(
      <Modal isOpen onClose={() => {}} title="Test No Footer" showFooter={false} id="testNoFooter">
        <div>No Footer!</div>
      </Modal>,
    );

    expect(await screen.findByTestId('testNoFooter')).toMatchSnapshot();
  });

  test('renders open', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn(() => {});
    const doneAction = jest.fn(() => {});

    const { baseElement } = render(
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

    expect(await screen.findByTestId('testOpen')).toMatchSnapshot();

    await user.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();

    await user.click(screen.getByText('Is Done'));
    expect(doneAction).toHaveBeenCalled();
  });

  test('presses escape', async () => {
    const onClose = jest.fn(() => {});
    const { baseElement, unmount } = render(
      <Modal isOpen onClose={onClose} title="Test Escape" />,
    );

    document.dispatchEvent(new KeyboardEvent('keypress', { code: 'KeyR', key: 82, keyCode: 82 }));
    expect(onClose).not.toHaveBeenCalled();

    document.dispatchEvent(new KeyboardEvent('keypress', { code: 'Escape', key: 27, keyCode: 27 }));
    expect(onClose).toHaveBeenCalledTimes(1);

    // Backwards compatibility
    document.dispatchEvent(new KeyboardEvent('keypress', { keyCode: 27 }));
    expect(onClose).toHaveBeenCalledTimes(2);

    unmount();

    document.dispatchEvent(new KeyboardEvent('keypress', { code: 'Escape', key: 27, keyCode: 27 }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  test('default actions don\'t crash', async () => {
    const user = userEvent.setup();

    render(<Modal isOpen title="Test Open" doneButtonText="OK" />);

    await user.click(screen.getByLabelText('Close'));
    await user.click(screen.getByText('OK'));
  });
});
