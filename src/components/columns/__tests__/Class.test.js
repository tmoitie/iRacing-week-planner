import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';

import Class from '../Class';

describe('components/columns/Class', () => {
  test('renders correctly', () => {
    render(<TableWrapper><Class race={{ licenceLevel: 5 }} /></TableWrapper>);

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });
});
