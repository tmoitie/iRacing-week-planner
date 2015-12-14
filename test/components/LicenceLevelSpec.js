/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { expect } from 'chai';

import LicenceLevel from '../../src/components/LicenceLevel';

const renderer = createRenderer();

describe('components/LicenceLevel', () => {

  it('renders for high D Class', function() {
    renderer.render(<LicenceLevel licence={8} />);
    const render = renderer.getRenderOutput();

    expect(render.props.children[0].props.children).to.equal('D');
    expect(render.props.children[1]).to.equal('4.00');
    expect(render.props.className).to.contain('licence-d');
  });

  it('renders for Pro', function() {
    renderer.render(<LicenceLevel licence={21} />);
    const render = renderer.getRenderOutput();

    expect(render.props.children[1]).to.equal('1.00');
    expect(render.props.className).to.contain('licence-p');
  });

  it('renders for float levels', function() {
    renderer.render(<LicenceLevel licence={7.5} />);
    const render = renderer.getRenderOutput();

    expect(render.props.children[0].props.children).to.equal('D');
    expect(render.props.children[1]).to.equal('3.50');
    expect(render.props.className).to.contain('licence-d');
  });

  it('renders for other float levels', function() {
    renderer.render(<LicenceLevel licence={8.5} />);
    const render = renderer.getRenderOutput();

    expect(render.props.children[0].props.children).to.equal('D');
    expect(render.props.children[1]).to.equal('4.50');
    expect(render.props.className).to.contain('licence-d');
  });
});
