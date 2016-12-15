import { UPDATE_DAYS } from '../actions/app';
import moment, { duration } from 'moment';
import { seasonStart, weekSeasonStart } from '../config';

const currentDate = moment(new Date()).utc().startOf('day');
const currentDays = currentDate.diff(seasonStart, 'days');
const getDateView = (date) => moment(date).local().format('YYYY MMM DD');
const getWeek = (date) => Math.ceil(duration(moment(date).add({ second: 1 }).diff(weekSeasonStart)).asWeeks());

export default function app(
  state = {
    date: currentDate,
    daysSinceSeasonStart: currentDays,
    dateView: getDateView(currentDate),
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
      dateView: getDateView(date),
      week: getWeek(date)
    };
  }

  return state;
}
