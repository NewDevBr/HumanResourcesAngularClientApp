import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthCandidateService } from 'src/app/services/authCandidateService/auth-candidate.service';

@Injectable()
export class CandidateInterceptor implements HttpInterceptor {

  token?: string;

  constructor(private authCandidate: AuthCandidateService) {  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.authCandidate.currentCandidate.subscribe(
        candidate => {
          if(!(typeof candidate === "undefined")){
            this.token = candidate.access_token;
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
