import React from 'react';
import { render } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import SortArrow from '../SortArrow';

describe('components/SortArrow', () => {
  test('renders down correctly', () => {
    const { container } = render(<SortArrow sort={{ order: 'desc', key: 'licence' }} />);

    expect(container).toMatchSnapshot();
  });

  test('renders up correctly', () => {
    const { container } = render(<SortArrow sort={{ order: 'asc', key: 'licence' }} />);

    expect(container).toMatchSnapshot();
  });
});
