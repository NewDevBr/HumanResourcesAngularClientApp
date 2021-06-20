import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthCandidateService } from 'src/app/services/authCandidateService/auth-candidate.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateGuard implements CanActivate {

  response : boolean = false; 
  
  constructor(
    private router: Router,
    private authCandidate: AuthCandidateService
  ) {
    this.authCandidate.currentCandidate.subscribe(
      val => {
        this.response = !(typeof val === "undefined" || typeof val.access_token === "undefined");
      }
    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.response == false){
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    }
    return this.response;
  }
  
}
