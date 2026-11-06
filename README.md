# RoboFriends

A small React + Redux Toolkit + TypeScript app that lists users from
[JSONPlaceholder](https://jsonplaceholder.typicode.com/users) as robot cards
(avatars from [RoboHash](https://robohash.org)) with live search by username or name.

**Live:** https://badrri-narayanan.github.io/robofriends/

## Stack

- React 19, Redux Toolkit 2 (`createSlice`, `createAsyncThunk`), react-redux hooks
- Vite 8, TypeScript 6
- Vitest + Testing Library
- ESLint (typescript-eslint, react-hooks, react-refresh)
- Tachyons for styling

## Getting started

Requires Node 22.12+ (see `.nvmrc`).

```sh
npm ci
npm run dev        # http://localhost:5173/robofriends/
```

## Scripts

| Script              | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the Vite dev server                    |
| `npm run build`     | Type-check and build to `dist/`              |
| `npm run preview`   | Serve the production build locally           |
| `npm test`          | Run tests in watch mode                      |
| `npm run test:ci`   | Run tests once                               |
| `npm run typecheck` | `tsc --noEmit`                               |
| `npm run lint`      | ESLint with zero warnings allowed            |
| `npm run deploy`    | Build and publish `dist/` to the `gh-pages` branch |

## Project layout

```
src/
  components/      Presentational components (Card, CardsList, SearchBox, Scroll, ErrorBoundary)
  containers/App/  Top-level App component
  redux/           Store, typed hooks, robots and search slices
```

## CI/CD

CircleCI (`.circleci/config.yml`):

- **verify** (every branch): type-check, lint, tests
- **deploy** (`master` only, after verify): builds and pushes `dist/` to `gh-pages`
  using a write-enabled GitHub deploy key registered in the CircleCI project
