[![codecov](https://codecov.io/gh/tmoitie/iRacing-week-planner/branch/master/graph/badge.svg?token=LZCUjPa0PU)](https://codecov.io/gh/tmoitie/iRacing-week-planner)

### Scrape

It needs live iRacing data to work - this can be downloaded with your iRacing credentials

```
IWP_USERNAME=your@emailaddress.co.uk IWP_PASSWORD=yourpassword yarn scrapeData
yarn debugRaces
```


### Editing

```
yarn start
open http://localhost:3000
```

### Updating for the next season

Because this scrapes the data from the iRacing website, the tool can only be updated for the new season once it is 
published on the iRacing website. As such the planner won't be updated until the turn of the season, typically
within a few hours of the data going live - Tuesday 1am UTC on the first week of the season.
