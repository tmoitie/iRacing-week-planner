import React from 'react';
import { shallow } from 'enzyme';
import { describe, expect, test } from '@jest/globals';

import LicenceLevel from '../LicenceLevel';

describe('components/LicenceLevel', () => {
  test('renders for high D Class', () => {
    const render = shallow(<LicenceLevel licence={8} />);
    expect(render).toMatchSnapshot();

    expect(render.find('.licenceLetter').text()).toBe('D');
    expect(render.find('.licenceText').text()).toBe('4.00');
    expect(render.hasClass('licenceD')).toBe(true);
  });

  test('renders for Pro', () => {
    const render = shallow(<LicenceLevel licence={21} />);
    expect(render).toMatchSnapshot();

    expect(render.find('.licenceText').text()).toBe('1.00');
    expect(render.hasClass('licenceP')).toBe(true);
  });

  test('renders for float levels', () => {
    const render = shallow(<LicenceLevel licence={7.5} />);
    expect(render).toMatchSnapshot();

    expect(render.find('.licenceLetter').text()).toBe('D');
    expect(render.find('.licenceText').text()).toBe('3.50');
    expect(render.hasClass('licenceD')).toBe(true);
  });

  test('renders for other float levels', () => {
    const render = shallow(<LicenceLevel licence={8.5} />);
    expect(render).toMatchSnapshot();

    expect(render.find('.licenceLetter').text()).toBe('D');
    expect(render.find('.licenceText').text()).toBe('4.50');
    expect(render.hasClass('licenceD')).toBe(true);
  });

  test('renders effective licence', () => {
    const render = shallow(<LicenceLevel licence={8} effective />);
    expect(render).toMatchSnapshot();

    expect(render.find('.licenceLetter').text()).toBe('C');
    expect(render.find('.licenceText').text()).toBe('');
    expect(render.hasClass('licenceC')).toBe(true);
  });
});
