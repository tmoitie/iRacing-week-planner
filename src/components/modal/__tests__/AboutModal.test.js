import { describe, test } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AboutModal from '../AboutModal';

describe('components/modal/AboutModal', () => {
  test('renders closed', async () => {
    const onClose = jest.fn(() => {});
    render(
      <AboutModal isOpen={false} onClose={onClose} />,
    );
    expect(screen.queryByTestId('about-modal')).not.toBeTruthy();
  });

  test('renders open', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn(() => {});
    render(
      <AboutModal isOpen onClose={onClose} />,
    );

    expect(await screen.findByTestId('about-modal')).toMatchSnapshot();

    await user.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
