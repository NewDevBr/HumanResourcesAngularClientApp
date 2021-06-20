import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthAdminService } from 'src/app/services/authAdminService/auth-admin.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  token?: string;

  constructor(private authAdmin: AuthAdminService) {  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.authAdmin.currentAdmin.subscribe(
        admin => {
          if(!(typeof admin === "undefined")){
            this.token = admin.access_token;
          }
        }
      );
      if (!(typeof this.token === "undefined")) {
        request = request.clone({
          setHeaders: { 
            Authorization: "Bearer " + this.token
          }
        });
      }
      return next.handle(request);
    }
}
