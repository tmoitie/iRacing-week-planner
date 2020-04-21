import series from '../data/season.json';
import tracks from '../data/tracks';

export default function({
  ownedTracks, favouriteSeries,
}) {
  console.log(ownedTracks)

  let currentSeries = series
  if (favouriteSeries.length !== 0) {
    currentSeries = series.filter(serie => favouriteSeries.includes(serie.seriesid))
  }
  let allTrackPkgIds = currentSeries.flatMap(serie => serie.tracks.map(track => track.pkgid))
    .filter(trackId => !ownedTracks.includes(trackId))
  let countById = Object.values(allTrackPkgIds.reduce((map, trackPkgId) => {
    map[trackPkgId] = map[trackPkgId] || {
      id: trackPkgId,
      name: tracks.find(track => track.pkgid === trackPkgId).name,
      series: [],
      count: 0
    }
    map[trackPkgId].count += 1
    return map
  }, {}))
  console.log(countById)
  // Fill series
  // Sort series by name
  return countById
    .filter(item => item.count > 1)
    .sort((a, b) => b.count - a.count); // Sort by count DESC / name ASC
}

