import uniqBy from 'lodash.uniqby';
import sortBy from 'lodash.sortby';
import fixText from './fixText';

export default function tracksFilter(allTracks) {
  const tracks = sortBy(uniqBy(sortBy(allTracks, 'priority'), (track) => track.pkgid), (track) => track.name);

  return tracks.map((track) => ({
    id: track.id,
    name: track.skuname ? fixText(track.skuname) : fixText(track.name),
    hasOval: allTracks.filter((t) => t.pkgid === track.pkgid && t.catid === 1).length > 0,
    hasRoad: allTracks.filter((t) => t.pkgid === track.pkgid && t.catid === 2).length > 0,
    primaryType: track.catid === 2 ? 'road' : 'oval',
    default: track.freeWithSubscription === true,
    pkgid: track.pkgid,
  }));
}
