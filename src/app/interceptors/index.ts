import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Authorization } from './auth-interceptor';
import { ExampleInterceptor } from './example-interceptor';

export const interceptorsProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ExampleInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: Authorization, multi: true },
];
