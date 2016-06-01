import { GETTING, GOT } from '../actions/contributors';

export default function contributors(state = { contributors: null, loading: false }, action) {
  switch (action.type) {
    case GETTING:
      return { ...state, contributors: null, loading: true };
    case GOT:
      return { ...state, contributors: action.contributors, loading: false };
    default:
      return state;
  }
}
