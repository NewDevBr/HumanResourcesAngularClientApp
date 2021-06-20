import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthAdminService } from 'src/app/services/authAdminService/auth-admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  response : boolean = false; 
  
  constructor(
    private router: Router,
    private authAdmin: AuthAdminService
  ) {
    this.authAdmin.currentAdmin.subscribe(
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
