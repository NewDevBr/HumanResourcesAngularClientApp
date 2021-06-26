import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthCandidateService } from 'src/app/services/authCandidateService/auth-candidate.service';
import { AuthAdminService } from 'src/app/services/authAdminService/auth-admin.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authCandidate: AuthCandidateService,
    private authAdmin: AuthAdminService
  ) {

    this.authAdmin.currentAdmin.subscribe(val => {
      let adminIsUndefined = (typeof val === "undefined");
      if(!adminIsUndefined){
        if(!!Object.values(val).length){
          this.router.navigate(['admin']);
        }
      }
    });

    this.authCandidate.currentCandidate.subscribe(val => {
      let candidateIsUndefined = (typeof val === "undefined");
      if(!candidateIsUndefined){
        if(!!Object.values(val).length){
          this.router.navigate(['candidate']);
        }
      }
    });
  }

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(45)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(10)
    ]),
    admin: new FormControl(''),
  });

  get formData() { return this.form.controls; }

  login() {
    if (
      this.form.get("admin")!.value === "undefined" ||
      this.form.get("admin")!.value == false
    ) {
      this.authCandidate.login(this.formData.email.value, this.formData.password.value)
        .pipe(first())
        .subscribe(
          () => {
            this.router.navigate(['candidate']);
            this.toastService.show("Welcome to Human Resources candidate", {
              classname: 'bg-primary text-light',
              delay: 3000,
              autohide: true
            });
          },
          (response) => {
            this.toastService.show("Error trying to login as candidate " + response.body.message, {
              classname: 'bg-danger text-light',
              delay: 3000,
              autohide: true
            });
          }
        );
    } else {
      this.authAdmin.login(this.formData.email.value, this.formData.password.value)
        .pipe(first())
        .subscribe(
          () => {
            this.router.navigate(['admin']);
            this.toastService.show("Welcome to Human Resources admin", {
              classname: 'bg-primary text-light',
              delay: 3000,
              autohide: true
            });
          },
          (response) => {
            this.toastService.show("Error trying to login as admin " + response.message, {
              classname: 'bg-danger text-light',
              delay: 3000,
              autohide: true
            });
          }
        );
    }
  }

  navigateToSignUp() {
    this.router.navigate(['signup']);
  }

  ngOnInit(): void {
  }

}
