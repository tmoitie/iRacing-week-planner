import { CHANGE_MODAL, UPDATE_DAYS } from '../actions/app';
import moment, { duration } from 'moment';
import { seasonStart, weekSeasonStart } from '../config';

const currentDate = moment(new Date()).utc().startOf('day');
const currentDays = currentDate.diff(seasonStart, 'days');
const getWeek = (date) => Math.ceil(duration(moment(date).add({ second: 1 }).diff(weekSeasonStart)).asWeeks());

export default function app(
  state = {
    date: currentDate,
    daysSinceSeasonStart: currentDays,
    week: getWeek(currentDate),
    currentModal: null,
  },
  { type, days, modalName }
) {
  if (type === UPDATE_DAYS) {
    const date = moment(seasonStart).add(days, 'days');
    return {
      ...state,
      date,
      daysSinceSeasonStart: days,
      week: getWeek(date)
    };
  }

  if (type === CHANGE_MODAL) {
    return {
      ...state,
      currentModal: modalName,
    };
  }

  return state;
}
