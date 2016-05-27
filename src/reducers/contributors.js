import { GETTING, GOT } from '../actions/contributors';

export default function contributors(state = { contributors: null }, action) {
  switch (action.type) {
    case GETTING:
      return { ...state, contributors: null };
    case GOT:
      return { ...state, contributors: action.contributors };
    default:
      return state;
  }
}
