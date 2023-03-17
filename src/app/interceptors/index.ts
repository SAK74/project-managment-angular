import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Authorization } from './auth-interceptor';
import { UserConnectInterceptor } from './connectUser';
import { ErrorLogsInterceptor } from './error-logs-interceptor';
import { SetSpinnerInterceptor } from './setSpinner-interceptor';

export const interceptorsProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SetSpinnerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: Authorization, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UserConnectInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorLogsInterceptor, multi: true },
];
