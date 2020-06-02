import { UPDATE_DAYS } from '../actions/app';
import moment, { duration } from 'moment';
import { seasonStart, weekSeasonStart } from '../config';

const currentDate = moment(new Date()).utc().startOf('day');
const currentDays = currentDate.diff(seasonStart, 'days');
const getWeek = (date) => Math.ceil(duration(moment(date).add({ second: 1 }).diff(weekSeasonStart)).asWeeks());

export default function app(
  state = {
    date: currentDate,
    daysSinceSeasonStart: currentDays,
    week: getWeek(currentDate)
  },
  action
) {
  if (action.type === UPDATE_DAYS) {
    const date = moment(seasonStart).add(action.days, 'days');
    return {
      ...state,
      date,
      daysSinceSeasonStart: action.days,
      week: getWeek(date)
    };
  }

  return state;
}
