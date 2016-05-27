import axios from 'axios';

export const GETTING = Symbol('GETTING');
export const GOT = Symbol('GOT');

function gettingAction() {
  return { type: GETTING };
}

function gotAction(contributors) {
  return { type: GOT, contributors };
}

export function getContributors() {
  console.log('getting');
  return (dispatch) => {
    console.log('getting');
    dispatch(gettingAction());
    return axios.get('https://api.github.com/repos/tmoitie/iRacing-week-planner/contributors')
      .then(response => dispatch(gotAction(response.data)))
      .catch(error => console.error(error.data));
  };
}
