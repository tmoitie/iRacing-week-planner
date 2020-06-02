import axios from 'axios';

export const GETTING = 'CONTRIB/GETTING';
export const GOT = 'CONTRIB/GOT';

function gettingAction() {
  return { type: GETTING };
}

function gotAction(contributors) {
  return { type: GOT, contributors };
}

export function getContributors() {
  return (dispatch) => {
    dispatch(gettingAction());
    return axios.get('https://api.github.com/repos/tmoitie/iRacing-week-planner/contributors')
      .then(response => dispatch(gotAction(response.data)))
      .catch(error => console.log(error.data));
  };
}
