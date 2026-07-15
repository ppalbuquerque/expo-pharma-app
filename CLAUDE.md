# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn start            # Expo dev server (Metro)
yarn ios              # expo run:ios (native build + run)
yarn android          # clean prebuild + expo run:android
yarn web              # web target
yarn lint             # expo lint (ESLint + Prettier, errors on violations)
yarn test             # jest --watchAll (jest-expo preset)
yarn test -- --watchAll=false path/to/File.test.tsx   # run one test / non-watch
```

Native builds need a dev client (`expo-dev-client`) — Expo Go won't run this app. `yarn android` runs a `--clean` prebuild each time, wiping and regenerating the `android/` native project.

## Backend dependency

App is frontend-only. All data comes from a REST API expected at `http://10.0.2.2:3000` (Android-emulator alias for host `localhost`) — hardcoded as `BASE_URL` in `services/medication.service.ts` and `features/chatbot/effects/useChatbotHomeViewModel.tsx`. That backend server must be running separately. iOS simulator will not reach `10.0.2.2`.

## Architecture

Feature-sliced MVVM on top of Expo Router (file-based routing, typed routes enabled).

**Routing (`app/`)** is a thin shell only. Route files render a screen from `features/` and nothing else — no logic lives in `app/`. Route groups: `(medication)`, `(chatbot)`. `app/_layout.tsx` is the single provider root: React Query `QueryClientProvider`, React Native Paper `PaperProvider` (MD3 light theme), Toast host, and `@/polyfills` import.

**Features (`features/<domain>/`)** — self-contained slices (`medicines`, `chatbot`) with a consistent internal layout:
- `screens/<name>/` — presentational component (`*.screen.tsx`) + colocated `styles.ts`. Screens are dumb: they consume a view-model hook and render.
- `effects/use*ViewModel.tsx` — **all screen logic lives here.** View-models own state, wire data hooks, and expose handlers/derived values to the screen. This is the layer to edit for behavior changes.
- `state/*.model.ts` — a `use<Domain>Model()` hook that bundles every React Query query/mutation for the domain and handles cache invalidation. Query keys are centralized in `state/*.queries.key.ts`.
- `components/`, `forms/` — colocated feature UI and react-hook-form schemas.

**Data flow:** Screen → view-model (`effects/`) → domain model (`state/`, React Query) → service (`services/`, axios) → REST API. Keep to this chain; don't call axios or React Query from a screen.

**Shared (`shared/`)** — cross-feature UI primitives (`components/common/`, each folder = `index.tsx` + `styles.ts`) and hooks (`hooks/common/`, e.g. `useDebounce`). Most primitives wrap React Native Paper.

**Types (`types/`)** — global ambient `.d.ts` declarations (no imports needed). `dto/` = request payloads, `responses/` = API response shapes. Imported via the `@types` alias.

## Conventions

- **Path aliases** (`tsconfig.json`): `@/*` → repo root, `@types` → `types/index.d.ts`. Prefer aliases over deep relative paths.
- **Styles** are always a separate `styles.ts` beside the component via `StyleSheet.create` — never inline style objects.
- **UI copy is Portuguese (pt-BR).** Match existing strings.
- **AI chatbot** streams via Vercel AI SDK (`@ai-sdk/react` `useCompletion`) against the backend `/ai-search` endpoint, using `expo/fetch` for streaming. `polyfills.js` (imported in `_layout.tsx`) sets up `TextEncoderStream`/`TextDecoderStream`/`structuredClone` for native — required for AI SDK streaming to work off web.
- **Reactotron** is wired in dev only (`reactotron.config.ts`, required behind `__DEV__` in `_layout.tsx`).
- TypeScript `strict` is on. Prettier enforced through ESLint (`trailingComma: es5`).

## Workflow

- **Load the `frontend-design` skill** before any implementation work.
- **Update documentation** whenever a change requires it — keep docs in sync with the code.
- **Use the `doc-module` skill** to write or update documentation.
- **Break implementations into tasks** before executing.
