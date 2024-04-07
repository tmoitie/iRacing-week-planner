import React from 'react';
import { render } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import StarIcon from '../StarIcon';

describe('components/icon/StarIcon', () => {
  test('renders correctly', () => {
    const { container } = render(<StarIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
