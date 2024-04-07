import React from 'react';
import { render } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import ShoppingCartIcon from '../ShoppingCartIcon';

describe('components/icon/ShoppingCartIcon', () => {
  test('renders correctly', () => {
    const { container } = render(<ShoppingCartIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
