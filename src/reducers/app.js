// @flow

import moment, { duration } from 'moment';
import { CHANGE_MODAL, UPDATE_DAYS } from '../actions/app';
import { SIGNED_IN } from '../actions/auth';
import { seasonStart, weekSeasonStart, seasonEnd } from '../config';

const getWeek = (date) => Math.ceil(duration(moment(date).add({ second: 1 }).diff(weekSeasonStart)).asWeeks());

type AppState = {
  date: moment$Moment,
  daysSinceSeasonStart: number,
  week: number,
  currentModal: string,
};

type AppReducerArgs = {
  type?: string,
  days?: number,
  modalName?: string,
};

export default function app(
  initState: ?AppState,
  { type, days, modalName }: AppReducerArgs,
): AppState {
  let state = initState;

  if (state === undefined) {
    let currentDate = moment(new Date()).utc().startOf('day');

    if (currentDate.isBefore(seasonStart)) {
      currentDate = moment(seasonStart).utc().startOf('day');
    }
    
    if (currentDate.isAfter(seasonEnd)) {
      currentDate = moment(seasonEnd).utc().startOf('day').subtract({ days: 1 });
    }

    const currentDays = currentDate.diff(seasonStart, 'days');

    state = {
      date: currentDate,
      daysSinceSeasonStart: currentDays,
      week: getWeek(currentDate),
      currentModal: null,
    };
  }

  if (type === UPDATE_DAYS) {
    const date = moment(seasonStart).add(days, 'days');
    return {
      ...state,
      date,
      daysSinceSeasonStart: days,
      week: getWeek(date),
    };
  }

  if (type === CHANGE_MODAL) {
    return {
      ...state,
      currentModal: modalName,
    };
  }

  if (type === SIGNED_IN) {
    return {
      ...state,
      currentModal: null,
    };
  }

  return state;
}
