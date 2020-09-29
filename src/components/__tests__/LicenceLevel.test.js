import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import LicenceLevel from '../LicenceLevel';

describe('components/LicenceLevel', () => {
  test('renders for high D Class', () => {
    const render = shallow(<LicenceLevel licence={8} />);

    expect(render.find('.licence-letter').text()).toBe('D');
    expect(render.find('.licence-text').text()).toBe('4.00');
    expect(render.hasClass('licence-d')).toBe(true);
  });

  test('renders for Pro', () => {
    const render = shallow(<LicenceLevel licence={21} />);

    expect(render.find('.licence-text').text()).toBe('1.00');
    expect(render.hasClass('licence-p')).toBe(true);
  });

  test('renders for float levels', () => {
    const render = shallow(<LicenceLevel licence={7.5} />);

    expect(render.find('.licence-letter').text()).toBe('D');
    expect(render.find('.licence-text').text()).toBe('3.50');
    expect(render.hasClass('licence-d')).toBe(true);
  });

  test('renders for other float levels', () => {
    const render = shallow(<LicenceLevel licence={8.5} />);

    expect(render.find('.licence-letter').text()).toBe('D');
    expect(render.find('.licence-text').text()).toBe('4.50');
    expect(render.hasClass('licence-d')).toBe(true);
  });

  test('renders effective licence', () => {
    const render = shallow(<LicenceLevel licence={8} effective />);

    expect(render.find('.licence-letter').text()).toBe('C');
    expect(render.find('.licence-text').text()).toBe('');
    expect(render.hasClass('licence-c')).toBe(true);
  });
});
