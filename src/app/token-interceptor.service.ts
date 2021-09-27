import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newHeaders = req.headers;
    const token = localStorage.getItem('token');

    if (token) {
      const authorization = `Bearer ${token}`;
      newHeaders = newHeaders.append('Authorization', authorization);
    }

    const authReq = req.clone({headers: newHeaders});

    return next.handle(authReq);
  }
}
