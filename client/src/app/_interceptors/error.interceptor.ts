import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router , private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{
        if (error){
          switch(error.status){
            case 400:
              if(error.error.erros){
                const modalStateErros = [];
                for (const key in error.error.erros){
                  if (error.error.erros[key]){
                    modalStateErros.push(error.error.erros[key])
                  }
                }
                throw modalStateErros.flat();
              }else{
                this.toastr.error(error.statusText,error.status);
              }
              break;
            case 401:
              this.toastr.error(error.statusText,error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state:{error:error.error}};
              this.router.navigateByUrl('/server-error',navigationExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);
          }
        }
        return throwError(error);
      })
    )
  }
}