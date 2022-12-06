import { create, act } from 'react-test-renderer';
import React from 'react';
import { describe, test } from '@jest/globals';

import Checkbox from '../Checkbox';

describe('components/Checkbox', () => {
  test('renders', async () => {
    let component;

    const onChange = jest.fn();

    act(() => {
      component = create(<Checkbox id="test-renders" onChange={onChange}>Test</Checkbox>);
    });

    expect(component.toJSON()).toMatchSnapshot();

    await component.root.findByType('input').props.onChange({ target: { checked: true } });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  test('renders disabled', () => {
    let component;

    act(() => {
      component = create(<Checkbox id="test-disabled" disabled />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders checked', () => {
    let component;

    act(() => {
      component = create(<Checkbox id="test-checked" checked />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
