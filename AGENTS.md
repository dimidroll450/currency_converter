# Repository Guide

## Toolchain and commands

- Use Bun 1.4.x (`bun.lockb` is tracked); Node.js 24.x is required.
- Vercel runs the build script under Bun via `vercel.json`; `bunVersion` selects Bun for any future Vercel Functions. The deployed Angular app runs in the browser.
- This is one Angular application, named `first`, with source in `src/`.
- Start development: `bun run start`.
- Lint TypeScript and HTML: `bun run lint`. SCSS is not part of the configured lint targets.
- Run the Vitest suite once: `bun run tests_ci`.
- Run a focused test file or directory: `bunx ng test --watch=false --include src/app/services/banned-currencies.service.spec.ts`.
- Use `bun run build:app` for a production build under Bun. Do not use `bun run build` for routine verification: it also injects/uploads Sentry source maps.
- Production budgets limit initial output to 1 MB and any component stylesheet to 4 KB.

## Application wiring

- The app is standalone and bootstraps from `src/main.ts`; it registers routing, `HttpClient` with `withFetch()`, Sentry error/tracing, Vercel Analytics, and Speed Insights directly there. Preserve these providers and telemetry initialization when changing bootstrap code.
- `AppComponent` periodically fetches NBU exchange rates and filters them through `BannedCurrenciesService`. The ban list is the shipped asset `src/assets/config/banned-currencies.json`; rate and ban-list URLs plus display priority live in `src/app/utils/constants.ts`.
- Components use OnPush change detection, signals for local state, and reactive forms. Keep new dependencies in each standalone component's `imports` array.

## Tests

- Tests use Angular's `unit-test` builder with Vitest and `TestBed` (`vitest/globals` types).
- `BannedCurrenciesService` immediately requests the ban-list asset in its constructor. HTTP tests that instantiate it must configure `provideHttpClient()` and `provideHttpClientTesting()`, flush that request, and call `HttpTestingController.verify()`.
