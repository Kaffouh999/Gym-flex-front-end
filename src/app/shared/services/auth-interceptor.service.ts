import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const ignoredUrls = [
      '/api/web' // ignore any URL that starts with /public/,
      
    ];
  
    const isIgnoredUrl = ignoredUrls.some(urlPattern => request.url.includes(urlPattern));
    if (isIgnoredUrl) {
      return next.handle(request);
    }

    const authReq = this.addToken(request);

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403 ) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getAccessToken();
    if (token) {
      console.log("request sent with token : "+token);
      return request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    }
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = this.authService.getRefreshToken();

    if (refreshToken) {
      return this.authService.refreshToken().pipe(
        switchMap(() => {
          const authReq = this.addToken(request);
          console.log("got new token and resend request");
          return next.handle(authReq);
        }),
        catchError(err => {
        
          return throwError(err);
 
        })
      );
    } else {
      this.authService.logout();
      return throwError('Authentication expired.');
    }
  }
}
