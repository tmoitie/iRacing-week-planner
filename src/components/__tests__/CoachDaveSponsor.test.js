import React from 'react';
import { create, act } from 'react-test-renderer';
import { describe, test } from '@jest/globals';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import CoachDaveSponsor from '../CoachDaveSponsor';

jest.mock('react-i18next');
jest.mock('axios');

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
