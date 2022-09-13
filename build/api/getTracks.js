import uniqBy from 'lodash.uniqby';
import sortBy from 'lodash.sortby';
import { clientGet } from './iracingClient';

export default async function getTracks() {
  const tracksResponse = await clientGet('/data/track/get');
  const trackAssetsResponse = await clientGet('/data/track/assets');
  const tracksSortedRetired = sortBy(tracksResponse.data, 'retired');
  const tracksSortedPriority = sortBy(tracksSortedRetired, 'priority');

  const tracksUniquePkgId = uniqBy(tracksSortedPriority, (track) => track.package_id);
  return tracksUniquePkgId.map((track) => {
    const assets = trackAssetsResponse.data[track.track_id];
    return {
      id: track.track_id,
      ids: tracksResponse.data
        .filter((filterTrack) => filterTrack.package_id === track.package_id)
        .map((foundTracks) => foundTracks.track_id),
      name: track.track_name,
      default: track.free_with_subscription === true,
      pkgid: track.package_id,
      primaryType: track.category,
      hasOval: tracksResponse.data.some((t) => t.package_id === track.pkgid && t.category === 'oval'),
      hasRoad: tracksResponse.data.some((t) => t.package_id === track.pkgid && t.category === 'road'),
      hasDirtOval: tracksResponse.data.some((t) => t.package_id === track.pkgid && t.category === 'dirt_oval'),
      hasDirtRoad: tracksResponse.data.some((t) => t.package_id === track.pkgid && t.category === 'dirt_road'),
      price: track.price,
      map: assets?.track_map_layers?.inactive ? `${assets.track_map}${assets.track_map_layers.inactive}` : null,
    };
  });
}
