import { isDevMode, ErrorHandler, APP_INITIALIZER, importProvidersFrom } from "@angular/core";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import * as Sentry from "@sentry/angular";


import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { Router } from "@angular/router";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppRoutingModule } from "./app/app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app/app.component";

inject({ mode: isDevMode() ? 'development' : 'production' });
injectSpeedInsights();

Sentry.init({
  dsn: "https://8bf9aa9572f29d71534d78b83284e9e9@o4508410843496448.ingest.de.sentry.io/4508410846183504",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, ReactiveFormsModule),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler({
                showDialog: true,
            }),
        }, {
            provide: Sentry.TraceService,
            deps: [Router],
        },
        {
            provide: APP_INITIALIZER,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            useFactory: () => () => { },
            deps: [Sentry.TraceService],
            multi: true,
        }
    ]
})
  .catch(err => console.error(err));
