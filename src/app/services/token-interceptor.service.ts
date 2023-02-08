import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private router: Router,
    private toasty: ToastrService) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
        //navigate /delete cookies or whatever
        this.router.navigateByUrl(`/login`);
        this.toasty.error('Você não esta logado ou usuário/senha estão incorretos.')
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of( ); // or EMPTY may be appropriate here
    }
    return throwError(err);
}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newHeaders = req.headers;
    const token = localStorage.getItem('token');

    if (token) {
      const authorization = `Bearer ${token}`;
      newHeaders = newHeaders.append('Authorization', authorization);
    }

    const authReq = req.clone({headers: newHeaders});

    return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));;
  }
}
