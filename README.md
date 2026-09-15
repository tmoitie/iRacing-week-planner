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

It needs live iRacing data to work - this can be downloaded with your iRacing credentials, and an [oauth password limited flow](https://oauth.iracing.com/oauth2/book/password_limited_flow.html) client.

```bash
IWP_USERNAME="your@emailaddress.co.uk" IWP_PASSWORD="yourpassword" IWP_CLIENT_ID="iwploader" IWP_CLIENT_SECRET="secret" yarn scrapeData
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

### Scheduled deploy notifications

The weekly deployment validates calculated race week lengths after scraping data. Invalid lengths do not stop the deployment, but send an AWS SES SMTP email to the administrator. Configure these `Deployment` environment variables:

- `SES_SMTP_SERVER`
- `SES_SMTP_PORT` set to `587`
- `SES_SMTP_USERNAME`
- `SES_FROM_EMAIL`, an SES-verified sender address

Configure these `Deployment` environment secrets:

- `SES_SMTP_PASSWORD`
- `ADMIN_EMAIL`

## Other information

### Inspect webpack bundle size

You can view the bundle size by running the following commands:

```bash
webpack --json > stats.json
```

```bash
yarn webpack-bundle-analyzer stats.json
```
