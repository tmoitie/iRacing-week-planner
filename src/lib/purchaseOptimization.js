import series from '../data/season.json';
import tracks from '../data/tracks.json';

export default function ({
  ownedTracks, favouriteSeries,
}) {
  const currentSeries = favouriteSeries.length === 0
    ? series
    : series.filter((serie) => favouriteSeries.includes(serie.seriesid));

  const allTrackPkgIds = currentSeries
    .flatMap((serie) => serie.tracks.map((track) => track.pkgid))
    .filter((pkgId) => !ownedTracks.includes(pkgId));

  const countById = Object.values(allTrackPkgIds.reduce((resultMap, trackPkgId) => {
    const originalTrack = tracks.find((track) => track.pkgid === trackPkgId);
    const fromSeries = currentSeries
      .filter((series) => series.tracks.filter((seriesTrack) => seriesTrack.pkgid === trackPkgId).length > 0)
      .map((series) => series.seriesname);

    resultMap[trackPkgId] = resultMap[trackPkgId] || {
      id: originalTrack.id,
      name: originalTrack.name,
      series: fromSeries,
      count: 0
    };

    resultMap[trackPkgId].count += 1;

    return resultMap;
  }, {}));

  return countById
    .filter((item) => item.count > 1)
    .sort((a, b) => b.count - a.count);
}
