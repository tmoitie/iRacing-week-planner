import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test } from '@jest/globals';

import LicenceLevel from '../LicenceLevel';

describe('components/LicenceLevel', () => {
  test('renders for high D Class', () => {
    const { container } = render(<LicenceLevel licence={8} />);
    expect(container).toMatchSnapshot();

    expect(container.firstChild).toHaveTextContent('D');
    expect(container.firstChild).toHaveTextContent('4.00');
    expect(container.firstChild).toHaveClass('licenceD');
  });

  test('renders for Pro', () => {
    const { container } = render(<LicenceLevel licence={21} />);
    expect(container).toMatchSnapshot();

    expect(container.firstChild).toHaveTextContent('1.00');
    expect(container.firstChild).toHaveClass('licenceP');
  });

  test('renders for float levels', () => {
    const { container } = render(<LicenceLevel licence={7.5} />);
    expect(container).toMatchSnapshot();

    expect(container.firstChild).toHaveTextContent('D');
    expect(container.firstChild).toHaveTextContent('3.50');
    expect(container.firstChild).toHaveClass('licenceD');
  });

  test('renders for other float levels', () => {
    const { container } = render(<LicenceLevel licence={8.5} />);
    expect(container).toMatchSnapshot();

    expect(container.firstChild).toHaveTextContent('D');
    expect(container.firstChild).toHaveTextContent('4.50');
    expect(container.firstChild).toHaveClass('licenceD');
  });

  test('renders effective licence', () => {
    const { container } = render(<LicenceLevel licence={8} effective />);
    expect(container).toMatchSnapshot();

    expect(container.firstChild).toHaveTextContent('C');
    expect(container.firstChild).not.toHaveTextContent('3.00');
    expect(container.firstChild).toHaveClass('licenceC');
  });
});
