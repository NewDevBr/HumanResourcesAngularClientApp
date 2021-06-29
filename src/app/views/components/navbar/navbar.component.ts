import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/authAdminService/auth-admin.service';
import { AuthCandidateService } from 'src/app/services/authCandidateService/auth-candidate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin?: boolean;

  adminRoutes : string [] = [
    '/admin/technologies',
    '/admin/vacancies',
    '/admin/candidates',
    '/admin/management',
    '/admin/profile'
  ];

  candidateRoutes : string [] = [
    '/candidate/vacancies',
    '/candidate/mySubscriptions',
    '/candidate/profile'
  ];

  constructor(
    private router : Router,
    private authAdmin : AuthAdminService,
    private authCandidate : AuthCandidateService,
  ) {
    this.authAdmin.currentAdmin.subscribe(val => {
      let adminIsUndefined = (typeof val === "undefined");
      if(!adminIsUndefined){
        if(!!Object.values(val).length){
          this.isAdmin = true;
        }
      }
    });

    this.authCandidate.currentCandidate.subscribe(val => {
      let candidateIsUndefined = (typeof val === "undefined");
      if(!candidateIsUndefined){
        if(!!Object.values(val).length){
          this.isAdmin = false;
        }
      }
    });
  }

  logout(){
    if(this.isAdmin){
      this.authAdmin.logout();
    } else {
      this.authCandidate.logout();
    }
    this.router.navigate(['login']);
    window.location.reload();
  }

  ngOnInit(): void {
  }

}