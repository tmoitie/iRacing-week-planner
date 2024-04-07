import moment, { duration } from 'moment';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';
import '@testing-library/jest-dom';

import EndDate from '../EndDate';

describe('components/columns/EndDate', () => {
  test('renders correctly', () => {
    render(
      <TableWrapper>
        <EndDate
          race={{
            startTime: moment('2020-09-22T01:00:00.000Z'),
            weekLength: duration({ days: 7 }),
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.getByTestId('table-row').firstChild).toHaveTextContent('9/28/2020'); // Node uses US I18n DateFormat
  });
});
