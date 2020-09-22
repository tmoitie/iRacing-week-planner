import { shallow } from 'enzyme';
import React from 'react';
import { describe, test } from '@jest/globals';

import Checkbox from '../../src/components/Checkbox';

describe('components/Checkbox', () => {
  test('renders', () => {
    const onChange = jest.fn();
    const render = shallow(<Checkbox onChange={onChange}>Test</Checkbox>);

    expect(render).toMatchSnapshot();

    render.find('input').at(0).simulate('change', { target: { checked: true }});
    expect(onChange).toHaveBeenCalled();
  });

  test('renders disabled', () => {
    const onChange = jest.fn()
    const render = shallow(<Checkbox disabled onChange={onChange} />);

    expect(render).toMatchSnapshot();

    render.find('input').at(0).simulate('click');
    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders checked', () => {
    const render = shallow(<Checkbox checked />);

    render.find('input').at(0).simulate('change', { target: { checked: true }});

    expect(render).toMatchSnapshot();
  });
});
