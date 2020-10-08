import moment from 'moment';
import React from 'react';
import { shallow } from 'enzyme';
import { describe, test, expect } from '@jest/globals';
import Modal from '../../modal/Modal';

import RaceTimes from '../RaceTimes';

describe('components/columns/RaceTimes', () => {
  test('renders no time data', () => {
    const component = shallow(<RaceTimes
      race={{
        raceTimes: null,
      }}
    />);

    expect(component).toMatchSnapshot();
  });

  test('renders settimes', () => {
    const component = shallow(<RaceTimes
      race={{
        series: 'Mazda Cup',
        raceTimes: {
          setTimes: [
            moment.duration({ days: 3, hours: 2 }),
            moment.duration({ days: 4, hours: 13 }),
          ],
        },
      }}
    />);

    expect(component).toMatchSnapshot();

    component.first().simulate('click');

    expect(component).toMatchSnapshot();

    component.find(Modal).first().props().onClose();

    expect(component).toMatchSnapshot();
  });

  test('renders everytime', () => {
    const component = shallow(<RaceTimes
      race={{
        series: 'Mazda Cup',
        raceTimes: {
          everyTime: moment.duration({ hours: 3 }),
          offset: moment.duration({ minutes: 90 }),
        },
      }}
    />);

    expect(component).toMatchSnapshot();
  });
});
