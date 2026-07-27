# AGENTS.md

## Project overview

This repository contains a client-side Angular currency converter. It uses Angular Material, standalone components, reactive forms, signals, and `HttpClient`. The application currently targets Angular 19 and is expected to migrate one major at a time toward Angular 22.

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

The existing `AppRoutingModule` is a legacy bridge around an empty route configuration. Do not expand this NgModule architecture; prefer standalone router providers when routing work is required.

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

The current test stack is Karma, Jasmine, and Angular `TestBed`. Match that setup unless the task explicitly requests a test-runner migration.

- Add or update focused tests for behavioral changes.
- Use Angular testing providers such as `provideHttpClientTesting()` for HTTP tests.
- Verify that HTTP tests leave no outstanding requests.
- Prefer Angular Material component harnesses when adding non-trivial Material interaction tests.

## Migration rules

For Angular major upgrades:

1. Upgrade sequentially: 19 to 20, 20 to 21, then 21 to 22.
2. Use `ng update` schematics; do not update framework version strings by hand as a substitute.
3. Keep Angular Core, CLI, compiler, build tooling, Material, CDK, and Angular ESLint compatible at every stage.
4. Confirm the required Node.js, TypeScript, RxJS, and `zone.js` ranges before each major.
5. Resolve peer-dependency conflicts rather than using `--force` or `--legacy-peer-deps`.
6. Run lint, tests, and a production build after every major step.
7. Inspect and preserve unrelated worktree changes, especially the existing `bun.lockb` state.

## Verification and change discipline

After generating or modifying Angular code, run at minimum:

```bash
bun run lint
bun run tests_ci
bunx ng build --configuration production
```

If a check cannot run, report the exact reason. Do not claim successful verification based only on code inspection.

Keep changes scoped to the request. Do not rewrite unrelated code, discard existing modifications, expose secrets, or commit generated output such as `dist/`, `.angular/`, or coverage reports.
