import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExampleInterceptor } from './example-interceptor';

export const interceptorsProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ExampleInterceptor, multi: true },
];
