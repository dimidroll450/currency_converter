import { ErrorHandler, inject, isDevMode, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { inject as injectVercelAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

injectVercelAnalytics({ mode: isDevMode() ? 'development' : 'production' });
injectSpeedInsights();

Sentry.init({
  dsn: environment.sentry_dsn,
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
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({ showDialog: true }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    provideAppInitializer(() => {
      inject(Sentry.TraceService);
    }),
  ],
})
  .catch((error: unknown) => console.error(error));
