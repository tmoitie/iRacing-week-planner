import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';

import '@testing-library/jest-dom';

import { Track } from '../index';

describe('components/columns/Track', () => {
  test('renders no own or fave', () => {
    render(
      <TableWrapper>
        <Track
          race={{
            trackId: 125,
          }}
          ownedTracks={[]}
          favouriteTracks={[]}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.getByTestId('table-row').firstChild).not.toHaveClass('success');
    expect(screen.queryByTestId('StarIcon')).not.toBeInTheDocument();
  });

  test('renders ownership', () => {
    render(
      <TableWrapper>
        <Track
          race={{
            trackId: 125,
          }}
          ownedTracks={[125]}
          favouriteTracks={[]}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.getByTestId('table-row').firstChild).toHaveClass('success');
    expect(screen.queryByTestId('StarIcon')).not.toBeInTheDocument();
  });

  test('renders favourite', () => {
    render(
      <TableWrapper>
        <Track
          race={{
            trackId: 125,
          }}
          ownedTracks={[]}
          favouriteTracks={[125]}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.getByTestId('table-row').firstChild).not.toHaveClass('success');
    expect(screen.queryByTestId('StarIcon')).toBeInTheDocument();
  });
});
