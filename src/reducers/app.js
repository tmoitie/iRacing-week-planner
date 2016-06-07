import { UPDATE_DATE } from '../actions/app';
import moment from 'moment';

const currentDate = moment(new Date()).utc().startOf('day');

export default function app(state = { date: currentDate }, action) {
  switch (action.type) {
    case UPDATE_DATE:
      return { ...state, date: action.date };
    default:
      return state;
  }
}
