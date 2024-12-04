import { isDevMode } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import * as Sentry from "@sentry/angular";

import { AppModule } from './app/app.module';

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

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
