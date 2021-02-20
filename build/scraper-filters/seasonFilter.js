import fixText from './fixText';

export default function seasonFilter(listing) {
  return listing.map((series) => ({
    seriesid: series.seriesid,
    seriesname: fixText(series.seriesname),
    start: series.start,
    end: series.end,
    tracks: series.tracks.map((track) => ({
      raceweek: track.raceweek,
      config: track.config,
      name: fixText(track.config ? `${track.name} - ${track.config}` : track.name),
      pkgid: track.pkgid,
    })),
    catid: series.catid,
    isOfficial: series.isOfficial,
    minlicenselevel: series.minlicenselevel,
    isFixedSetup: series.isFixedSetup,
    carclasses: series.carclasses.map(({ shortname }) => ({ shortname: fixText(shortname) })),
    cars: series.cars.map(({ sku }) => ({ sku })),
    seasonid: series.seasonid,
  }));
}
