# Repository Guide

## Toolchain and commands

- Use Bun 1.4.x (`bun.lockb` is tracked). When running the Angular CLI under Node.js, use Node.js 24.15.0 or newer within the 24.x release line.
- Vercel runs the build script under Bun via `vercel.json`; do not set `engines.node` in `package.json` because it overrides `bunVersion` on Vercel. The deployed Angular app runs in the browser.
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

- Install dependencies: `bun install`
- Start locally: `bun run start`
- Lint: `bun run lint`
- Unit tests: `bun run tests_ci`
- Production build without external upload: `bunx ng build --configuration production`
- Generate Angular artifacts: `bunx ng generate <schematic>`

Do not run `bun run build` during routine verification because it also uploads source maps to Sentry. Only run it when the user explicitly wants to exercise the deployment/source-map workflow.

Do not replace Bun with npm, pnpm, or Yarn, and do not introduce another lockfile unless explicitly requested.

## Angular architecture

- Prefer standalone components, directives, and pipes.
- Bootstrap through `bootstrapApplication`; do not introduce a root `AppModule`.
- Keep dependencies local in each standalone component's `imports` array.
- Prefer provider functions such as `provideHttpClient` and `provideRouter` over importing provider-only NgModules.
- Use `inject()` consistently for new dependency injection code.
- Use Angular's built-in template control flow (`@if`, `@for`, `@switch`) for new templates.
- Track `@for` collections by a stable identifier when one is available rather than by object identity.
- Keep strict TypeScript and Angular template checking enabled.

Routes live in `app.routes.ts` and are registered with `provideRouter`. Keep routing standalone; do not introduce routing NgModules.

## State, forms, and RxJS

- Prefer signals for local synchronous state and derived state.
- Preserve the existing reactive-forms approach unless a task explicitly includes a forms migration.
- Keep observable streams as observables when handling HTTP or other asynchronous event sources.
- Avoid nested subscriptions and deprecated APIs such as `toPromise()`.
- Ensure long-lived subscriptions, timers, and intervals are cleaned up, preferably with `DestroyRef` and `takeUntilDestroyed()` where supported by the installed Angular version.
- Give public methods and observable-returning service methods explicit return types.

## Angular Material and styling

- Use public Angular Material/CDK APIs only.
- Keep `@angular/material` and `@angular/cdk` on matching versions.
- Preserve the global prebuilt Material theme unless the task explicitly changes theming.
- Prefer component-scoped SCSS and native CSS animations for new work.
- Do not add new dependencies on Angular's legacy animation DSL.

## Accessibility and templates

- Use semantic HTML and native controls before custom interaction patterns.
- Preserve keyboard navigation, visible focus, accessible names, and appropriate ARIA behavior.
- Avoid `[innerHTML]` for presentation when normal template markup can express the same result.
- Keep templates declarative; move substantial business logic into TypeScript.

## Testing

The current test stack is Vitest, Angular's `unit-test` builder, and Angular `TestBed`. Match that setup unless the task explicitly requests a test-runner migration.

- Add or update focused tests for behavioral changes.
- Use Angular testing providers such as `provideHttpClientTesting()` for HTTP tests.
- Verify that HTTP tests leave no outstanding requests.
- Prefer Angular Material component harnesses when adding non-trivial Material interaction tests.

