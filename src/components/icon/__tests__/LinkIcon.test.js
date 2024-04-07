import React from 'react';
import { render } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import LinkIcon from '../LinkIcon';

describe('components/icon/LinkIcon', () => {
  test('renders correctly', () => {
    const { container } = render(<LinkIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
