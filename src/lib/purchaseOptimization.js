import series from '../data/season.json';
import tracks from '../data/tracks';

export default function({
  ownedTracks, favouriteSeries,
}) {
  const currentSeries = favouriteSeries.length === 0 ? series : series.filter(serie => favouriteSeries.includes(serie.seriesid))
  const allTrackPkgIds = currentSeries
    .flatMap(serie => serie.tracks.map(track => track.pkgid))
    .filter(pkgId => !ownedTracks.includes(pkgId))
  const countById = Object.values(allTrackPkgIds.reduce((map, trackPkgId) => {
    const originalTrack = tracks.find(track => track.pkgid === trackPkgId)
    const fromSeries = currentSeries.filter(serie => serie.tracks.filter(serieTrack => serieTrack.pkgid === trackPkgId).length > 0).map(serie => serie.seriesname)
    map[trackPkgId] = map[trackPkgId] || {
      id: originalTrack.id,
      name: originalTrack.name,
      series: fromSeries,
      count: 0
    }
    map[trackPkgId].count += 1
    return map
  }, {}))
  // Fill series
  // Sort series by name

  console.log(countById)
  return countById
    .filter(item => item.count > 1)
    .sort((a, b) => b.count - a.count); // Sort by count DESC / name ASC
}

