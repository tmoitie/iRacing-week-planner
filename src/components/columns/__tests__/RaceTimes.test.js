import moment from 'moment';
import React from 'react';
import { shallow } from 'enzyme';
import { create, act } from 'react-test-renderer';
import { describe, test, expect } from '@jest/globals';
import Modal from '../../modal/Modal';

import RaceTimes from '../RaceTimes';

describe('components/columns/RaceTimes', () => {
  test('renders no time data', () => {
    const component = create(<RaceTimes
      race={{
        raceTimes: null,
      }}
    />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders settimes', () => {
    let component;
    act(() => {
      component = create(<RaceTimes
        race={{
          series: 'Mazda Cup',
          setTimes: [
            moment.duration({ days: 3, hours: 2 }),
            moment.duration({ days: 4, hours: 13 }),
          ],
        }}
      />);
    });

    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
      component.root.findByType('button').props.onClick();
    });

    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
      component.root.findByProps({ className: 'glyphicon glyphicon-remove' }).parent.parent.props.onClick({
        preventDefault: () => {},
        stopPropagation: () => {},
      });
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders everytime', () => {
    const component = create(<RaceTimes
      race={{
        series: 'Mazda Cup',
        everyTime: moment.duration({ hours: 3 }),
        offset: moment.duration({ minutes: 90 }),
      }}
    />);

    expect(component.toJSON).toMatchSnapshot();
  });

  test('renders everytime no offset', () => {
    const component = create(<RaceTimes
      race={{
        series: 'Mazda Cup',
        everyTime: moment.duration({ hours: 3 }),
      }}
    />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
