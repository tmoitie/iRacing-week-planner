import React from 'react';
import { create, act } from 'react-test-renderer';
import { describe, test } from '@jest/globals';

import CoachDaveSponsor from '../CoachDaveSponsor';

jest.mock('react-i18next');

describe('components/CoachDaveSponsor', () => {
  test('renders', async () => {
    let component;

    act(() => {
      component = create(<CoachDaveSponsor />);
    });

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root.findByType('a').props.onClick();
    });

    expect(window.dataLayer.push).toHaveBeenCalledWith(expect.objectContaining({ event: 'select_content' }));
  });
});
