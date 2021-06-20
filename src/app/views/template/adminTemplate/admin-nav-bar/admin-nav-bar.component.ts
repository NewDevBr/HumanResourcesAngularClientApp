import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/authAdminService/auth-admin.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  constructor(
    private router : Router,
    private authAdmin : AuthAdminService,
    private toastService: ToastService,
  ) { }

  logout(){
    this.authAdmin.logout();
    this.router.navigate(['login']);
  }

  navbarCollapsed = true;

  toggleNavbarCollapsing() {
      this.navbarCollapsed = !this.navbarCollapsed;
  }

  ngOnInit(): void {
  }

}
