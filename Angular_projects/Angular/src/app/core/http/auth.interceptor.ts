// We’ll add an API prefix + auth token, and retry network/5xx with exponential backoff.
// If a 401 hits, we’ll “refresh” once (mocked).

// Flow Summary
// Intercept Request:
// -    Add /api prefix and Authorization header (if token exists).
// Send Request:
// -    Pass the modified request to the next handler.
// Retry on Failure:
// -    Retry up to 3 times for network or server errors with exponential backoff.
// Handle 401 Errors:
// -    Refresh the token and retry the request once.
// Pass Errors:
// -    If all retries fail or the error is not retriable, pass the error to the caller.
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { catchError, Observable, retry, throwError, timer } from 'rxjs';

function isRetriable(err: HttpErrorResponse) {
  return err.status === 0 || (err.status >= 500 && err.status < 600);
}

function backoffMs(retryCount: number) {
  return 200 * Math.pow(2, retryCount);
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.auth.snapshot()?.token;
    const prefixed = req.clone({
      url: req.url.startsWith('/api') ? req.url : `/api${req.url}`,
      setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return next.handle(prefixed).pipe(
      retry({
        count: 3,
        delay: (error, retryCount) => {
          if (error instanceof HttpErrorResponse && isRetriable(error)) {
            return timer(backoffMs(retryCount));
          }
          // abort retry by throwing
          throw error;
        },
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.refreshAndRetry(prefixed, next);
        }
        return throwError(() => err);
      }),
    );
  }

  private refreshAndRetry(original: HttpRequest<any>, next: HttpHandler) {
    return new Observable<HttpEvent<any>>((sub) => {
      this.auth
        .refresh()
        .then((newToken) => {
          const u = this.auth.snapshot();
          if (u) this.auth.setUser({ ...u, token: newToken });
          const retryReq = original.clone({
            setHeaders: { Authorization: `Bearer ${newToken}` },
          });
          next.handle(retryReq).subscribe(sub);
        })
        .catch((err) => sub.error(err));
    });
  }
}
