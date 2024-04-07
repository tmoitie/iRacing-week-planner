import { describe, test } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OptionsModal from '../OptionsModal';

describe('components/modal/OptionsModal', () => {
  test('renders closed', async () => {
    const { baseElement } = render(
      <OptionsModal isOpen={false} onClose={() => {}} columnIds={[]} saveOptions={() => {}} />,
    );
    expect(screen.queryByTestId('optionsModal')).not.toBeTruthy();
  });

  test('renders with checkbox saving', async () => {
    const user = userEvent.setup();

    const save = jest.fn(() => {});
    const { baseElement } = render(
      <OptionsModal isOpen onClose={() => {}} columnIds={['id', 'class']} saveOptions={save} />,
    );

    expect(await screen.findByTestId('optionsModal')).toMatchSnapshot();

    await user.click(screen.getByLabelText('ID'));
    expect(save).toHaveBeenCalledWith('columns', ['class']);

    await user.click(screen.getByLabelText('Licence'));
    expect(save).toHaveBeenCalledWith('columns', ['id', 'class', 'licence']);
  });
});
