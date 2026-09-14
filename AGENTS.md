# Repository Guide

## Setup and Commands

- Use Node 22.21 (`nvm use`); `package.json` requires Node `>=22.15.0 <23`.
- Install dependencies with `yarn install`.
- Run the app with `yarn start`; the default URL is `http://localhost:3000`.
- Run tests with `yarn test --runInBand` or pass focused test paths.
- Build production assets with `NODE_ENV=production yarn build`.

## Generated Data

- `src/data/{car-class,cars,contributors,season,tracks}.json` is generated and gitignored.
- Generate it with `yarn scrapeData`; this requires the iRacing OAuth environment variables documented in `README.md`.
- Fresh worktrees do not contain these files, so tests and builds fail until data is generated or supplied locally.
- Never commit credentials or generated data.

## Code Conventions

- The frontend uses React, Redux, Flow annotations, Jest, and webpack.
- Follow existing module and test patterns; keep changes small and update snapshots only for intentional UI changes.
- Season boundaries live in `src/config.js`; release notes live in `src/data/changelog.js`.
- Preserve unrelated worktree changes and inspect staged and unstaged diffs separately.

## Firebase

- Use the modular Firebase API. `DocumentSnapshot.exists` is a method: call `exists()`.
- Settings writes are debounced for 10 seconds. Pending writes are flushed on `pagehide`, hidden visibility, and app unmount.
- Firebase Auth authorized domains and Google API-key HTTP referrer restrictions are separate. Local ports may need explicit referrer entries.
- Test both existing and missing Firestore documents; mocks must match the real modular API.

## Locales

- Translation files belong directly under `translations/`, not a nested directory.
- Register each locale in `src/i18n.js`: Intl locale data, translation import, `languages`, and `resources`.
- Add the Moment locale to `ContextReplacementPlugin` in `webpack.config.js`.
- The navbar derives its menu from `languages`; locale codes display uppercase, while internal identifiers retain canonical casing such as `pt-BR`.
- Update navbar and app snapshots when adding a locale, and verify the new dropdown item explicitly.

## Verification

- Run focused tests for changed behavior, then a production build for dependency, Firebase, webpack, or locale changes.
- Existing Sass deprecation and bundle-size warnings are known; new compile errors are not.
