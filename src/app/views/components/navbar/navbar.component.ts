import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/authAdminService/auth-admin.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router : Router,
    private authAdmin : AuthAdminService,
    private toastService: ToastService,
  ) { }

  logout(){
    this.authAdmin.logout();
    this.router.navigate(['login']);
    this.toastService.show('I hope to see you again', {
      classname: 'bg-primary text-light',
      delay: 2000 ,
      autohide: true
    });
  }

  navbarCollapsed = true;

  toggleNavbarCollapsing() {
      this.navbarCollapsed = !this.navbarCollapsed;
  }

  ngOnInit(): void {
  }

}