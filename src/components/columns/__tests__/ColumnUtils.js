import React from 'react';

export function TableWrapper({ children }) {
  return (
    <table>
      <tbody>
        <tr data-testid="table-row">
          {children}
        </tr>
      </tbody>
    </table>
  );
}
