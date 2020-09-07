import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import LicenceLevel from '../../src/components/LicenceLevel';

describe('components/LicenceLevel', () => {
  it('renders for high D Class', () => {
    const render = shallow(<LicenceLevel licence={8} />);

    expect(render.find('.licence-letter').text()).to.equal('D');
    expect(render.find('.licence-text').text()).to.equal('4.00');
    expect(render.hasClass('licence-d')).to.equal(true);
  });

  it('renders for Pro', () => {
    const render = shallow(<LicenceLevel licence={21} />);

    expect(render.find('.licence-text').text()).to.equal('1.00');
    expect(render.hasClass('licence-p')).to.equal(true);
  });

  it('renders for float levels', () => {
    const render = shallow(<LicenceLevel licence={7.5} />);

    expect(render.find('.licence-letter').text()).to.equal('D');
    expect(render.find('.licence-text').text()).to.equal('3.50');
    expect(render.hasClass('licence-d')).to.equal(true);
  });

  it('renders for other float levels', () => {
    const render = shallow(<LicenceLevel licence={8.5} />);

    expect(render.find('.licence-letter').text()).to.equal('D');
    expect(render.find('.licence-text').text()).to.equal('4.50');
    expect(render.hasClass('licence-d')).to.equal(true);
  });
});
