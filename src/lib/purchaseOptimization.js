import series from '../data/season.json';
import tracks from '../data/tracks';

export default function({
  ownedTracks, favouriteSeries,
}) {
  let currentSeries = series
  if (favouriteSeries.length !== 0) {
    currentSeries = series.filter(serie => favouriteSeries.includes(serie.seriesid))
  }
  let allTrackIds = currentSeries.flatMap(serie => serie.tracks.map(track => track.pkgid))
    .filter(trackId => !ownedTracks.includes(trackId))
  let countById = Object.entries(allTrackIds.reduce((map, trackId) => {
    map[trackId] = map[trackId] || 0
    map[trackId] += 1
    return map
  }, {})).sort((a, b) => b[1] - a[1])
  console.log(countById)
  return countById;
}
