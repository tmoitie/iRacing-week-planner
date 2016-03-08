import allTracks from '../data/tracks.json';
import {uniqBy, sortBy} from 'lodash';

const fixText = (text) => (decodeURIComponent(text).replace(/\+/g, ' ').trim());

const tracks = sortBy(uniqBy(sortBy(allTracks, 'priority'), track => track.pkgid), track => track.name);

export default tracks.map((track) => {
  return {
    id: track.pkgid,
    name: track.skuname ? fixText(track.skuname) : fixText(track.name),
    hasOval: allTracks.filter((t) => t.pkgid === track.pkgid && t.catid === 1).length > 0,
    hasRoad: allTracks.filter((t) => t.pkgid === track.pkgid && t.catid === 2).length > 0,
    primaryType: track.catid === 2 ? 'road' : 'oval',
    default: track.freeWithSubscription === true
  };
});
