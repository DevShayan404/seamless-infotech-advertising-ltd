import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withDebugTracing,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    importProvidersFrom([BrowserAnimationsModule, HttpClientModule]),
    provideClientHydration(),
    provideLottieOptions({
      player: () => player,
    }),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // Toastr providers
  ],
};
