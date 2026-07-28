# AGENTS.md

## Project overview

This repository contains a client-side Angular 22 currency converter. It uses Angular Material, standalone components, reactive forms, signals, zoneless change detection, and `HttpClient`.

Before changing Angular code, inspect `package.json` and run `bunx ng version`. Apply guidance appropriate to the installed Angular version, not merely the intended target version.

## Package manager and commands

Use Bun because `angular.json` declares `bun` as the package manager and `bun.lockb` is tracked.

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

