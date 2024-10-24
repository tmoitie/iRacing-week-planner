import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';
import '@testing-library/jest-dom';
import { LinkColumn } from '../index';

describe('components/columns/LinkColumn', () => {
  test('renders correctly', () => {
    render(<TableWrapper><LinkColumn race={{ seasonId: 4234 }} /></TableWrapper>);

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.getByTestId('LinkColumn-link').getAttribute('href')).toContain('4234');
  });
});
