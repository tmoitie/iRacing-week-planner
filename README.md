[![codecov](https://codecov.io/gh/tmoitie/iRacing-week-planner/branch/master/graph/badge.svg?token=LZCUjPa0PU)](https://codecov.io/gh/tmoitie/iRacing-week-planner)

<br />
<div align="center">

<h3 align="center">iRacing Week Planner</h3>

  <p align="center">
    <a href="https://iracing-week-planner.tmo.lol/">Visit website</a>
    <br />
    <br />
    <a href="https://github.com/tmoitie/iRacing-week-planner/issues">Report Bug</a>
    ·
    <a href="https://github.com/tmoitie/iRacing-week-planner/issues">Request Feature</a>
  </p>
</div>

## Getting Started

### Install dependencies

```bash
yarn install
```

### Scrape data

It needs live iRacing data to work - this can be downloaded with your iRacing credentials

```bash
IWP_USERNAME='your@emailaddress.co.uk' IWP_PASSWORD='yourpassword' yarn scrapeData
yarn debugRaces
```

### Starting the project

```bash
yarn start
open http://localhost:3000
```

## Updating for the next season

Because this scrapes the data from the iRacing website, the tool can only be updated for the new season once it is
published on the iRacing website. As such the planner won't be updated until the turn of the season, typically
within a few hours of the data going live - Tuesday 1am UTC on the first week of the season.

## Other information

### Inspect webpack bundle size

You can view the bundle size by running the following commands:

```bash
webpack --json > stats.json
```

```bash
yarn webpack-bundle-analyzer stats.json
```
