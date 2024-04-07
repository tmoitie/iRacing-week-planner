import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';
import '@testing-library/jest-dom';

import Official from '../Official';

describe('components/columns/Official', () => {
  test('renders true', () => {
    render(<TableWrapper><Official race={{ official: true }} /></TableWrapper>);

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.queryByTestId('TickIcon')).toBeInTheDocument();
  });

  test('renders false', () => {
    render(<TableWrapper><Official race={{ official: false }} /></TableWrapper>);

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.queryByTestId('TickIcon')).not.toBeInTheDocument();
  });
});
