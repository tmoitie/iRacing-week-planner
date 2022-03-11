import { describe, test } from '@jest/globals';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import OptionsModal from '../OptionsModal';

describe('components/modal/OptionsModal', () => {
  test('renders closed', async () => {
    const component = renderer.create(
      <OptionsModal isOpen={false} onClose={() => {}} columnIds={[]} saveOptions={() => {}} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with checkbox saving', async () => {
    const save = jest.fn(() => {});
    let component;
    act(() => {
      component = renderer.create(
        <OptionsModal isOpen onClose={() => {}} columnIds={['id', 'class']} saveOptions={save} />,
      );
    });

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root.findByProps({ id: 'options-columns-id' }).props.onChange(false);
    });

    expect(save).toHaveBeenCalledWith('columns', ['class']);

    await act(async () => {
      await component.root.findByProps({ id: 'options-columns-licence' }).props.onChange(true);
    });

    expect(save).toHaveBeenCalledWith('columns', ['id', 'class', 'licence']);
  });
});
